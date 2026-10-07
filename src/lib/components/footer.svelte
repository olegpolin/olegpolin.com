<script lang="ts">
  import Logo from '#lib/assets/logo.svelte';
  import DashedRule from '#lib/components/dashed-rule.svelte';
  import { site } from '#lib/config/site.ts';

  const links = [
    { title: 'X', href: site.x, external: true },
    { title: 'LinkedIn', href: site.linkedin, external: true },
    { title: 'GitHub', href: site.github, external: true },
    { title: 'Resume', href: site.resume }
  ];
</script>

<footer class="pt-12">
  <div class="flex flex-col gap-6 px-4 pb-12 md:flex-row md:items-center md:justify-between md:px-8">
    <a class="flex h-8 items-center gap-3 font-medium" href="/">
      <Logo class="size-6.5" />
      {site.name}
    </a>
    <nav class="flex flex-wrap items-center gap-x-8 gap-y-1" aria-label="Elsewhere">
      {#each links as { title, href, external } (href)}
        <a
          class="flex h-8 items-center underline-offset-4 hover:underline"
          {href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          {title}
        </a>
      {/each}
      <a class="flex h-8 items-center underline-offset-4 hover:underline" href="mailto:{site.email}">
        {site.email}
      </a>
    </nav>
  </div>
  <DashedRule />
  <p class="px-4 pt-5 pb-7 text-sm text-muted-foreground md:px-8">
    Built with SvelteKit. Deployed on Cloudflare.
    <a
      class="underline decoration-input underline-offset-[3px] hover:text-foreground hover:decoration-foreground"
      href={site.github}
      target="_blank"
      rel="noreferrer"
    >
      Source on GitHub
    </a>.
  </p>
</footer>
