import { getRequestEvent, query } from '$app/server';
import { fetchNowPlaying, isConfigured, type NowPlaying } from '#lib/server/spotify.ts';

const POLL_MS = 15_000;

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => (clearTimeout(timer), resolve()), { once: true });
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
    const track = await fetchNowPlaying(signal);
    const serialised = JSON.stringify(track);
    if (serialised !== previous) {
      previous = serialised;
      yield track;
    }
    await sleep(POLL_MS, signal);
  }
});
