/*
  Spotify Web API client for the now-playing widget. Server only.

  It needs SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN
  (see src/env.ts). The first two come from the app at developer.spotify.com/dashboard.
  The refresh token is a one-time step, repeated only if Spotify revokes it:

  1. In the app's settings, add the redirect URI http://127.0.0.1:8888/callback and save.
  2. Open this URL, signed in as the account to show, and click Agree:
     https://accounts.spotify.com/authorize?client_id=<CLIENT_ID>&response_type=code
       &redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback
       &scope=user-read-currently-playing%20user-read-recently-played
     The browser lands on an unreachable 127.0.0.1 page; copy the `code` from its address bar.
  3. Within a minute, exchange it:
     curl -u "<CLIENT_ID>:<CLIENT_SECRET>" -d grant_type=authorization_code -d code=<CODE>
       -d redirect_uri=http://127.0.0.1:8888/callback https://accounts.spotify.com/api/token
     Keep `refresh_token` from the response; `access_token` expires hourly and is fetched here.
*/
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
} from '$app/env/private';

export interface NowPlaying {
  isPlaying: boolean;
  title: string;
  artists: string;
  album: string;
  image: string | null;
  /** Null for local files, which Spotify has no page for. */
  url: string | null;
}

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string; width: number | null }[] };
  external_urls: { spotify?: string };
}

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const API_URL = 'https://api.spotify.com/v1/me/player';
const UPSTREAM_TIMEOUT_MS = 10_000;
/** How long a fetched result is shared by every stream in this isolate. */
const CACHE_MS = 15_000;

// Per-isolate state: one access token, one in-flight refresh, one poll result.
let token: { value: string; expiresAt: number } | null = null;
let refreshing: Promise<string> | null = null;
let last: { value: NowPlaying | null; at: number } | null = null;
let polling: Promise<NowPlaying | null> | null = null;
let cooldownUntil = 0;

export function isConfigured() {
  return Boolean(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN);
}

async function refreshToken() {
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
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
  });
  if (!response.ok) throw new Error(`Spotify token refresh failed: ${response.status}`);

  const { access_token, expires_in } = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };
  token = { value: access_token, expiresAt: Date.now() + expires_in * 1000 };
  return access_token;
}

/** The cached access token, refreshed a minute before expiry; concurrent callers share one refresh. */
function getAccessToken() {
  if (token && token.expiresAt > Date.now() + 60_000) return Promise.resolve(token.value);
  refreshing ??= refreshToken().finally(() => (refreshing = null));
  return refreshing;
}

async function api<T>(path: string): Promise<T | null> {
  let response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
  });
  // Spotify can revoke a token before it expires; refresh once and retry.
  if (response.status === 401) {
    token = null;
    response = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${await getAccessToken()}` },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
    });
  }
  if (response.status === 204) return null;
  if (response.status === 429) {
    const seconds = Number(response.headers.get('retry-after')) || 30;
    cooldownUntil = Date.now() + seconds * 1000;
  }
  if (!response.ok) throw new Error(`Spotify ${path} failed: ${response.status}`);
  return (await response.json()) as T;
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
    album: track.album.name,
    image: images[0]?.url ?? null,
    url: track.external_urls.spotify ?? null
  };
}

/** The current track, else the last played one, else null. */
async function fetchNowPlaying(): Promise<NowPlaying | null> {
  const current = await api<{ is_playing: boolean; item: SpotifyTrack | null }>(
    '/currently-playing'
  );
  // `item` is null for ads and podcasts; treat those like silence.
  if (current?.item) return normalise(current.item, current.is_playing);

  const recent = await api<{ items: { track: SpotifyTrack }[] }>('/recently-played?limit=1');
  const last = recent?.items[0]?.track;
  return last ? normalise(last, false) : null;
}

/**
 * The track to show. Shared by every stream in this isolate, so Spotify is polled at most
 * once per CACHE_MS however many visitors are connected. On an upstream failure or 429
 * cooldown it keeps returning the last good value rather than flashing the empty state.
 */
export function getNowPlaying(): Promise<NowPlaying | null> {
  if (!isConfigured()) return Promise.resolve(null);
  const now = Date.now();
  if ((last && now - last.at < CACHE_MS) || now < cooldownUntil) {
    return Promise.resolve(last?.value ?? null);
  }
  polling ??= fetchNowPlaying()
    .catch((error) => {
      console.error('[spotify]', error);
      return last?.value ?? null;
    })
    .then((value) => {
      last = { value, at: Date.now() };
      polling = null;
      return value;
    });
  return polling;
}
