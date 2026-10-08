import { query } from '$app/server';
import { getNowPlaying as poll } from '#lib/server/spotify.ts';

/** The current (or last played) Spotify track. The server shares one poll across all visitors. */
export const getNowPlaying = query(poll);
