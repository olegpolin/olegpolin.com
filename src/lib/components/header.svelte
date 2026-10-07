<script lang="ts">
  import { page } from '$app/state';
  import * as Popover from '#lib/components/ui/popover/index.ts';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.ts';
  import CopyEmail from '#lib/components/copy-email.svelte';
  import ThemeToggle from '#lib/components/theme-toggle.svelte';
  import Logo from '#lib/assets/logo.svelte';
  import { site } from '#lib/config/site.ts';

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'Work', href: '/work' },
    { title: 'Photography', href: '/photography' },
    { title: 'About', href: '/about' }
  ];

  let menuOpen = $state(false);

  const current = (href: string) =>
    href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header class="relative flex h-18 items-center justify-between px-5">
  <a class="flex h-11 items-center gap-3 font-medium" href="/">
    <Logo class="size-6.5" />
    {site.name}
  </a>

  <nav
    class="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex"
    aria-label="Main"
  >
    {#each navLinks as { title, href } (href)}
      <a
        class="flex h-9 items-center rounded-lg px-3 py-1.5 font-medium hover:bg-muted aria-[current=page]:bg-muted"
        {href}
        aria-current={current(href) ? 'page' : undefined}
      >
        {title}
      </a>
    {/each}
  </nav>

  <div class="flex items-center gap-2">
    <ThemeToggle />
    <CopyEmail variant="outline" size="sm" class="max-lg:hidden" />

    <Popover.Root bind:open={menuOpen}>
      <Popover.Trigger
        class={['lg:hidden', buttonVariants({ variant: 'outline', size: 'icon' })]}
        aria-label="Toggle menu"
      >
        <span class="relative block size-4" aria-hidden="true">
          <span
            class={[
              'absolute left-0 block h-px w-4 bg-foreground transition-all duration-100',
              menuOpen ? 'top-2 -rotate-45' : 'top-1'
            ]}
          ></span>
          <span
            class={[
              'absolute left-0 block h-px w-4 bg-foreground transition-all duration-100',
              menuOpen ? 'top-2 rotate-45' : 'top-2.5'
            ]}
          ></span>
        </span>
      </Popover.Trigger>
      <Popover.Content
        class="h-(--bits-popover-content-available-height) w-(--bits-popover-content-available-width) overflow-y-auto rounded-none border-none bg-background p-0 shadow-none ring-0"
        align="start"
        side="bottom"
        preventScroll
      >
        <div class="flex min-h-full flex-col gap-8 p-6">
          <nav class="flex flex-col gap-1" aria-label="Main">
            {#each navLinks as { title, href } (href)}
              <a
                class="flex h-12 items-center rounded-lg px-3 text-2xl font-medium aria-[current=page]:bg-muted"
                {href}
                aria-current={current(href) ? 'page' : undefined}
                onclick={() => (menuOpen = false)}
              >
                {title}
              </a>
            {/each}
          </nav>
          <div class="mt-auto flex flex-col gap-3">
            <CopyEmail />
            <Button variant="outline" href={site.resume}>Resume</Button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  </div>
</header>
