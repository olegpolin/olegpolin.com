<!--
  The error page, rendered inside the root layout for a missing route (404) or a failed load.
  A selection drawn around a layer that isn't there, labelled with the path that was asked for.
-->
<script lang="ts">
  import { page } from '$app/state';
  import Seo from '#lib/components/seo.svelte';
  import { Button } from '#lib/components/ui/button/index.ts';
  import DashedRule from '#lib/components/dashed-rule.svelte';
  import Selection from '#lib/components/selection.svelte';

  const notFound = $derived(page.status === 404);
  const title = $derived(notFound ? 'Page not found' : 'Something went wrong');
  const lede = $derived(
    notFound
      ? 'There is nothing at this address. It may have moved, or it never existed.'
      : (page.error?.message ?? 'An unexpected error occurred. Try again in a moment.')
  );
</script>

<Seo title="{page.status} {title}" noindex />

<section
  class="flex flex-col items-center px-4 pt-24 pb-28 text-center motion-safe:animate-in motion-safe:duration-500 motion-safe:fade-in motion-safe:slide-in-from-bottom-2 md:pt-44 md:pb-52"
  aria-labelledby="error-title"
>
  <Selection label={page.url.pathname} class="w-full max-w-172.5">
    <h1 class="text-h2 font-medium text-balance md:text-title" id="error-title">{title}</h1>
    <p class="mx-auto mt-4 max-w-160 text-xl text-balance text-muted-foreground">{lede}</p>
  </Selection>
  <div class="mt-10 flex flex-wrap justify-center gap-3">
    <Button href="/">Back to home</Button>
    <Button variant="outline" href="/work">See work</Button>
  </div>
</section>

<DashedRule />
