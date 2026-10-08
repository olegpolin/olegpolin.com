// Spotify Web API client for the now-playing widget. Server only.
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
  url: string;
}

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string; width: number | null }[] };
  external_urls: { spotify: string };
}

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const API_URL = 'https://api.spotify.com/v1/me/player';

// One access token per isolate; refreshed a minute before it expires.
let cached: { token: string; expiresAt: number } | null = null;

export function isConfigured() {
  return Boolean(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN);
}

async function getAccessToken(signal: AbortSignal) {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

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
    signal
  });
  if (!response.ok) throw new Error(`Spotify token refresh failed: ${response.status}`);

  const { access_token, expires_in } = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };
  cached = { token: access_token, expiresAt: Date.now() + expires_in * 1000 };
  return access_token;
}

async function api<T>(path: string, signal: AbortSignal): Promise<T | null> {
  const token = await getAccessToken(signal);
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal
  });
  if (response.status === 204) return null;
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
    url: track.external_urls.spotify
  };
}

/** The current track, else the last played one, else null. Never throws. */
export async function fetchNowPlaying(signal: AbortSignal): Promise<NowPlaying | null> {
  if (!isConfigured()) return null;
  try {
    const current = await api<{ is_playing: boolean; item: SpotifyTrack | null }>(
      '/currently-playing',
      signal
    );
    // `item` is null for ads and podcasts; treat those like silence.
    if (current?.item) return normalise(current.item, current.is_playing);

    const recent = await api<{ items: { track: SpotifyTrack }[] }>(
      '/recently-played?limit=1',
      signal
    );
    const last = recent?.items[0]?.track;
    return last ? normalise(last, false) : null;
  } catch (error) {
    if (signal.aborted) return null;
    console.error('[spotify]', error);
    return null;
  }
}
