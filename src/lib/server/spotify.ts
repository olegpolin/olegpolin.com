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
const TIMEOUT_MS = 10_000;
/** How long one result is shared, so Spotify is polled at most this often per isolate. */
const CACHE_MS = 15_000;

let token: { value: string; expiresAt: number } | null = null;
let result: { promise: Promise<NowPlaying | null>; at: number } | null = null;

export function isConfigured() {
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
  if (!response.ok) throw new Error(`Spotify token refresh failed: ${response.status}`);

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
 * The track to show. One result is shared by every caller until CACHE_MS after it settled,
 * and a failed poll keeps the previous one, so Spotify hiccups never flash the empty state.
 */
export function getNowPlaying(): Promise<NowPlaying | null> {
  if (!isConfigured()) return Promise.resolve(null);
  if (!result || Date.now() - result.at > CACHE_MS) {
    const previous = result?.promise ?? Promise.resolve(null);
    const entry = {
      at: Infinity, // reused by everyone while in flight
      promise: fetchNowPlaying()
        .catch((error) => {
          console.error('[spotify]', error);
          return previous;
        })
        .finally(() => (entry.at = Date.now()))
    };
    result = entry;
  }
  return result.promise;
}
