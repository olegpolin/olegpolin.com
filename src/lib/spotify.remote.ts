import { getRequestEvent, query } from '$app/server';
import { getNowPlaying as poll, isConfigured, type NowPlaying } from '#lib/server/spotify.ts';

const POLL_MS = 15_000;

/** Resolves after `ms`, or as soon as `signal` aborts, leaving no listener behind. */
function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) return resolve();
    const done = () => {
      clearTimeout(timer);
      signal.removeEventListener('abort', done);
      resolve();
    };
    const timer = setTimeout(done, ms);
    signal.addEventListener('abort', done);
  });
}

/** Streams the current (or last played) Spotify track, polling while a client is connected. */
export const getNowPlaying = query.live(async function* (): AsyncGenerator<NowPlaying | null> {
  // Must be read synchronously, before the first await.
  const { signal } = getRequestEvent().request;

  if (!isConfigured()) {
    yield null;
    return;
  }

  let previous: string | undefined;
  while (!signal.aborted) {
    const track = await poll();
    const serialised = JSON.stringify(track);
    if (serialised !== previous) {
      previous = serialised;
      yield track;
    }
    await sleep(POLL_MS, signal);
  }
});
