<!--
  The live Spotify widget on the About page: the track playing right now, else the last
  one played, else an empty state. Every state is a 64 px row so nothing shifts as it loads.
-->
<script lang="ts">
  import { getNowPlaying } from '#lib/spotify.remote.ts';
  import type { NowPlaying } from '#lib/server/spotify.ts';
</script>

{#snippet eyebrow(text: string, live = false)}
  <p class="mono flex items-center gap-2 text-label text-muted-foreground">
    {#if live}
      <span class="bars" aria-hidden="true"><span></span><span></span><span></span></span>
    {/if}
    {text}
  </p>
{/snippet}

{#snippet glyph()}
  <span class="flex size-16 shrink-0 items-center justify-center rounded-md bg-secondary">
    <svg class="size-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
      />
    </svg>
  </span>
{/snippet}

{#snippet card(track: NowPlaying)}
  {#if track.image}
    <img
      src={track.image}
      alt=""
      width="64"
      height="64"
      loading="lazy"
      class="size-16 shrink-0 rounded-md bg-secondary"
    />
  {:else}
    {@render glyph()}
  {/if}
  <div class="min-w-0">
    {@render eyebrow(track.isPlaying ? 'now playing' : 'last played', track.isPlaying)}
    <p class="truncate font-medium underline-offset-4 group-hover/track:underline">{track.title}</p>
    <p class="truncate text-muted-foreground">{track.artists}</p>
  </div>
{/snippet}

{#snippet empty()}
  <div class="flex items-center gap-5">
    {@render glyph()}
    <div>
      {@render eyebrow('spotify')}
      <p class="text-muted-foreground">Nothing playing right now.</p>
    </div>
  </div>
{/snippet}

<section class="px-4 py-16" aria-label="Now playing">
  <div class="mx-auto max-w-170">
    <svelte:boundary>
      {@const track = await getNowPlaying()}
      {#if track?.url}
        <a
          href={track.url}
          target="_blank"
          rel="noreferrer"
          class="group/track flex items-center gap-5"
          aria-label="{track.title} by {track.artists} on Spotify"
        >
          {@render card(track)}
        </a>
      {:else if track}
        <div class="flex items-center gap-5">{@render card(track)}</div>
      {:else}
        {@render empty()}
      {/if}

      {#snippet pending()}
        <div class="flex animate-pulse items-center gap-5" aria-hidden="true">
          <span class="size-16 shrink-0 rounded-md bg-secondary"></span>
          <div class="flex flex-col gap-2">
            <span class="h-3 w-20 rounded-sm bg-secondary"></span>
            <span class="h-4 w-48 rounded-sm bg-secondary"></span>
            <span class="h-4 w-32 rounded-sm bg-secondary"></span>
          </div>
        </div>
      {/snippet}

      {#snippet failed()}
        {@render empty()}
      {/snippet}
    </svelte:boundary>
  </div>
</section>

<style>
  /* Three bouncing bars, 12 px tall, next to "now playing". */
  .bars {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
    height: 12px;
  }
  .bars span {
    width: 2px;
    height: 40%;
    background: currentColor;
    animation: bounce 1.1s ease-in-out infinite;
  }
  .bars span:nth-child(2) {
    animation-delay: -0.35s;
  }
  .bars span:nth-child(3) {
    animation-delay: -0.7s;
  }
  @keyframes bounce {
    0%,
    100% {
      height: 30%;
    }
    50% {
      height: 100%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .bars span {
      animation: none;
      height: 60%;
    }
  }
</style>
