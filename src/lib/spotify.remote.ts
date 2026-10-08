import { query } from '$app/server';
import { getNowPlaying as poll } from '#lib/server/spotify.ts';

/** The current (or last played) Spotify track, polled at most once per 15 s per isolate. */
export const getNowPlaying = query(poll);
