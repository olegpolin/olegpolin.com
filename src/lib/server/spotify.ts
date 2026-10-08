/*
  Spotify Web API client for the now-playing widget. Server only.

  It needs SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN. The first two
  come from the app at developer.spotify.com/dashboard.
  Development Mode has a small, undocumented quota shared by every app on the account. Going
  over it returns 429 QUOTA_EXCEEDED for hours, so a 429 pauses polling for its Retry-After.
  Refresh tokens expire six months after authorizing, so repeat these steps twice a year,
  or whenever the log shows `invalid_grant`:

  1. In the app's settings, add the redirect URI http://127.0.0.1:8888/callback and save.
  2. Open this URL, signed in as the account to show, and click Agree:
     https://accounts.spotify.com/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played
     The browser lands on an unreachable 127.0.0.1 page; copy the `code` from its address bar.
  3. Within a minute, exchange it:
     curl -u "<CLIENT_ID>:<CLIENT_SECRET>" -d grant_type=authorization_code -d code=<CODE> -d redirect_uri=http://127.0.0.1:8888/callback https://accounts.spotify.com/api/token
     Keep `refresh_token` from the response; `access_token` expires hourly and is fetched here.
*/
import { error } from '@sveltejs/kit';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
} from '$app/env/private';

export interface NowPlaying {
  isPlaying: boolean;
  title: string;
  artists: string;
  image: string | null;
  /** Null for local files, which Spotify has no page for. */
  url: string | null;
}

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string; width: number | null }[] };
  external_urls: { spotify?: string };
}

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const API_URL = 'https://api.spotify.com/v1/me/player';
const TIMEOUT_MS = 10_000;
/** How long one result is shared. Under the widget's 60 s refresh so every tick re-polls. */
const CACHE_MS = 30_000;
/** How long the last played track is reused before asking Spotify again. */
const RECENT_MS = 15 * 60_000;
/** The least a quota 429 pauses polling, and the pause when Retry-After is missing. */
const QUOTA_PAUSE_MS = 60 * 60_000;
/** The most any Retry-After is trusted for, so a bogus value cannot stall an isolate for good. */
const MAX_PAUSE_MS = 24 * 60 * 60_000;

let token: { value: string; expiresAt: number } | null = null;
let result: { value: NowPlaying | null; at: number } | null = null;
/** The last played track, and when Spotify last confirmed it. */
let recent: NowPlaying | null = null;
let recentCheckedAt = 0;
/** No Spotify calls before this time: one cache window after a poll starts, or a 429's pause. */
let nextPollAt = 0;
/** The poll in progress, shared by every request that arrives while it runs. */
let inflight: Promise<NowPlaying | null> | null = null;

function isConfigured() {
  return Boolean(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN);
}

async function fetchToken() {
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN!
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS)
  });
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    if (response.status === 429) pause(response.headers.get('retry-after'), body);
    throw new Error(`Spotify token refresh failed: ${response.status} ${body}`);
  }

  const { access_token, expires_in } = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };
  return { value: access_token, expiresAt: Date.now() + expires_in * 1000 };
}

async function api<T>(path: string): Promise<T | null> {
  if (!token || token.expiresAt < Date.now() + 60_000) token = await fetchToken();
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token.value}` },
    signal: AbortSignal.timeout(TIMEOUT_MS)
  });
  if (response.status === 204) return null;
  if (response.status === 401) token = null; // revoked early; the next poll gets a fresh one
  if (!response.ok) {
    const body = await response.text().catch(() => ''); // a lost body must not lose the pause
    if (response.status === 429) pause(response.headers.get('retry-after'), body);
    throw new Error(`Spotify ${path} failed: ${response.status} ${body}`);
  }
  return (await response.json()) as T;
}

/** Stop polling for as long as a 429 says. Retrying during a quota block only prolongs it. */
function pause(retryAfter: string | null, body: string) {
  const seconds = Number(retryAfter); // 0 when missing, NaN when not a number
  let ms = seconds > 0 ? Math.min(seconds * 1000, MAX_PAUSE_MS) : QUOTA_PAUSE_MS;
  // Quota blocks last hours whatever the header says, unlike the 30 s rate-limit window.
  if (body.includes('QUOTA_EXCEEDED')) ms = Math.max(ms, QUOTA_PAUSE_MS);
  nextPollAt = Math.max(nextPollAt, Date.now() + ms); // never shorten a pause already in force
}

function normalise(track: SpotifyTrack, isPlaying: boolean): NowPlaying {
  // Album art comes as 640/300/64 px; the widget shows it at 64 px, so 300 is plenty.
  const images = [...track.album.images].sort(
    (a, b) => Math.abs((a.width ?? 0) - 300) - Math.abs((b.width ?? 0) - 300)
  );
  return {
    isPlaying,
    title: track.name,
    artists: track.artists.map((a) => a.name).join(', '),
    image: images[0]?.url ?? null,
    url: track.external_urls.spotify ?? null
  };
}

/** The current track, else the last played one, else null. */
async function fetchNowPlaying(): Promise<NowPlaying | null> {
  const current = await api<{
    is_playing: boolean;
    currently_playing_type: string;
    item: SpotifyTrack | null;
  }>('/currently-playing');
  // Ads and podcasts have no track item.
  if (current?.currently_playing_type === 'track' && current.item) {
    const value = normalise(current.item, current.is_playing);
    // Remember it as the last played, but unconfirmed: once playback stops, ask Spotify in case
    // a shorter track came and went between polls.
    recent = { ...value, isPlaying: false };
    recentCheckedAt = 0;
    return value;
  }

  // The last played track only changes when something plays, so ask for it rarely.
  if (Date.now() - recentCheckedAt > RECENT_MS) {
    const played = await api<{ items: { track: SpotifyTrack }[] }>('/recently-played?limit=1');
    recentCheckedAt = Date.now(); // an empty history is an answer too
    const track = played?.items[0]?.track;
    if (track) recent = normalise(track, false);
  }
  return recent;
}

/**
 * What to serve while Spotify is unavailable: the last known track, no longer claimed to be
 * playing. With nothing known yet it fails as an expected error, which SvelteKit does not log
 * as a crash and which leaves a client showing whatever it already has.
 */
function fallback(): NowPlaying {
  const last = result?.value;
  if (!last) error(503, 'Spotify is unavailable');
  return { ...last, isPlaying: false };
}

/**
 * The track to show, cached for CACHE_MS per isolate. Polls run one at a time and at most once
 * per cache window, whatever their outcome. A failed poll, or a 429 pause, keeps the isolate's
 * last track but stops claiming it is still playing. State lives in isolate memory, so a fresh
 * isolate during a pause spends one probe and then has nothing to serve until the pause ends;
 * a shared store would be the next step if that matters.
 */
export async function readNowPlaying(): Promise<NowPlaying | null> {
  if (!isConfigured()) return null;
  const now = Date.now();
  if (result && now - result.at < CACHE_MS) return result.value;
  if (inflight) return inflight;
  if (now < nextPollAt) return fallback();

  nextPollAt = now + CACHE_MS;
  inflight = poll(now).finally(() => (inflight = null));
  return inflight;
}

async function poll(at: number): Promise<NowPlaying | null> {
  let value: NowPlaying | null;
  try {
    value = await fetchNowPlaying();
  } catch (cause) {
    console.error('[spotify]', cause);
    value = fallback();
  }
  result = { value, at }; // dated from the start, so a client's next tick finds it stale
  return value;
}
