import { query } from '$app/server';
import { readNowPlaying } from '#lib/server/spotify.ts';

/** The current (or last played) Spotify track. */
export const getNowPlaying = query(readNowPlaying);
