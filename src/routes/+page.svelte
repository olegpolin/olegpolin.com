<script lang="ts">
  import Seo from '#lib/components/seo.svelte';
  import { Button } from '#lib/components/ui/button/index.ts';
  import ArrowLink from '#lib/components/arrow-link.svelte';
  import CopyEmail from '#lib/components/copy-email.svelte';
  import DashedRule from '#lib/components/dashed-rule.svelte';
  import Selection from '#lib/components/selection.svelte';
  import { site } from '#lib/config/site.ts';
  import { alsoBuilt, selected } from '#lib/data/work.ts';
  import { photos } from '#lib/data/photos.ts';

  const [flenze] = selected;
</script>

<Seo />

<section class="flex flex-col items-center px-4 pt-24 pb-28 text-center md:pt-66 md:pb-77" aria-label="Introduction">
  <Selection label="olegpolin.com" class="w-full max-w-172.5">
    <h1 class="text-[44px] leading-none font-medium tracking-tight md:text-display">{site.name}</h1>
    <p class="mx-auto mt-4 max-w-160 text-xl text-balance text-muted-foreground">{site.description}</p>
  </Selection>
  <div class="mt-10 flex flex-wrap justify-center gap-3">
    <CopyEmail />
    <Button variant="outline" href={site.github} target="_blank" rel="noreferrer">GitHub</Button>
  </div>
</section>

<DashedRule />

<section class="px-4 py-20" aria-labelledby="flenze">
  <div class="mx-auto max-w-170">
    <h2 class="text-h2" id="flenze">Flenze</h2>
    <p class="mt-3 text-xl">The stack your agent should have picked.</p>
    <p class="mt-3 text-pretty text-muted-foreground">
      Opinionated SvelteKit starters, add-ons and design styles for building web apps with coding agents:
      less code, fewer dependencies, and a project you can still read in a year.
    </p>
    <enhanced:img src={flenze.cover} alt="Flenze home page" class="mt-8 aspect-video w-full" />
    <ArrowLink href="https://flenze.com" target="_blank" rel="noreferrer" class="mt-4">flenze.com</ArrowLink>
  </div>
</section>

<DashedRule />

<section class="px-4 py-20" aria-labelledby="also-built">
  <div class="mx-auto max-w-170">
    <h2 class="mb-6 text-2xl font-medium" id="also-built">Also built</h2>
    <ul class="border-t">
      {#each alsoBuilt as { name, href, line, year } (href)}
        <li class="grid grid-cols-[minmax(0,1fr)_72px] items-baseline gap-x-6 gap-y-1 border-b py-4 md:grid-cols-[200px_minmax(0,1fr)_72px]">
          <a class="link justify-self-start font-medium" {href} target="_blank" rel="noreferrer">{name}</a>
          <span class="mono text-right text-sm leading-6 text-muted-foreground md:order-last">{year}</span>
          <span class="col-span-2 text-muted-foreground md:col-span-1">{line}</span>
        </li>
      {/each}
    </ul>
    <ArrowLink href="/work" class="mt-4">See all work</ArrowLink>
  </div>
</section>

<DashedRule />

<section class="px-4 py-20" aria-labelledby="how-i-work">
  <div class="mx-auto max-w-170">
    <h2 class="mb-6 text-2xl font-medium" id="how-i-work">How I work</h2>
    <p class="text-pretty">
      I build with Svelte, SvelteKit, Tailwind CSS, shadcn-svelte and Cloudflare. The stack is chosen for
      simplicity and speed: less code to write and read, fewer tokens when a coding agent works on it, and
      fast pages with nothing to maintain.
    </p>
    <p class="mt-4 text-muted-foreground">
      TypeScript throughout, and plenty of other tools along the way, Python and C++ among them. Always up
      for learning whatever a job needs.
    </p>
  </div>
</section>

<DashedRule />

<section class="px-4 py-20" aria-labelledby="photographs">
  <div class="mx-auto max-w-170">
    <h2 class="mb-6 text-2xl font-medium" id="photographs">Photographs</h2>
    <div class="grid grid-cols-2 gap-5 md:grid-cols-4">
      {#each photos.slice(0, 4) as { id, year, picture } (id)}
        <enhanced:img src={picture} alt="Photograph, {year}" class="aspect-4/3 w-full object-cover" />
      {/each}
    </div>
    <ArrowLink href="/photography" class="mt-4">All photographs</ArrowLink>
  </div>
</section>

<DashedRule />

<section class="px-4 py-20" aria-labelledby="about">
  <div class="mx-auto max-w-170">
    <h2 class="mb-6 text-2xl font-medium" id="about">About</h2>
    <blockquote class="text-2xl font-medium">What is this earth without art? Just a rock.</blockquote>
    <ArrowLink href="/about" class="mt-4">About me</ArrowLink>
  </div>
</section>

<DashedRule />
