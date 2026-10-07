<script lang="ts">
  import * as NavigationMenu from '#lib/components/ui/navigation-menu';
  import * as Popover from '#lib/components/ui/popover';
  import { Button, buttonVariants } from '#lib/components/ui/button';
  import { toggleMode } from 'mode-watcher';
  import SunIcon from '@lucide/svelte/icons/sun';
  import MoonIcon from '@lucide/svelte/icons/moon';
  import Logo from '#lib/assets/logo.svelte';
  import { site } from '#lib/config/site.ts';

  const navLinks = [
    {
      title: 'Home',
      href: '/home'
    },
    {
      title: 'Work',
      href: '/work'
    },
    {
      title: 'Photography',
      href: '/photography'
    },
    {
      title: 'About',
      href: '/about'
    }
  ];

  let mobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 flex h-16 flex-row items-center justify-between gap-8 bg-background px-6 py-3">
  <div class="flex items-center gap-8">
    <a class="flex items-center gap-2 text-xl font-semibold" href="/">
      <Logo class="size-8" />
      {site.name}
    </a>

    <NavigationMenu.Root class="max-lg:hidden">
      <NavigationMenu.List>
        {#each navLinks as { title, href } (href)}
          <NavigationMenu.Item>
            <NavigationMenu.Link>
              {#snippet child()}
                <Button class="px-4" variant="ghost" {href}>{title}</Button>
              {/snippet}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        {/each}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>

  <div class="flex items-center gap-2">
    <div class="flex items-center gap-2 max-lg:hidden">
      <Button onclick={toggleMode} variant="outline" size="icon">
        <SunIcon
          class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
        />
        <MoonIcon
          class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>

      <Button>Email</Button>
    </div>

    <Popover.Root bind:open={mobileMenuOpen}>
      <Popover.Trigger class={['lg:hidden', buttonVariants({ variant: 'ghost', size: 'icon' })]}>
        <div class="flex h-8 flex-row items-center">
          <div class="relative size-4">
            <span
              class={[
                'absolute inset-s-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
                mobileMenuOpen ? 'top-[0.4rem] -rotate-45' : 'top-1'
              ]}
            ></span>
            <span
              class={[
                'absolute inset-s-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
                mobileMenuOpen ? 'top-[0.4rem] rotate-45' : 'top-2.5'
              ]}
            ></span>
          </div>
          <span class="sr-only">Toggle Menu</span>
        </div>
      </Popover.Trigger>
      <Popover.Content
        class="no-scrollbar h-(--bits-popover-content-available-height) w-(--bits-popover-content-available-width) overflow-y-auto rounded-none border-none ring-0 bg-background/90 p-0 shadow-none backdrop-blur"
        align="start"
        side="bottom"
        preventScroll
      >
        <div class="flex min-h-full flex-col gap-8 overflow-auto p-6">
          <div class="flex flex-col gap-3">
            {#each navLinks as { title, href } (href)}
              <a class="text-2xl font-medium active:opacity-60" {href} onclick={() => (mobileMenuOpen = false)}>
                {title}
              </a>
            {/each}
          </div>

          <div class="mt-auto flex flex-col gap-8">
            <div class="flex flex-col gap-3">
              <Button size="lg" onclick={() => (mobileMenuOpen = false)}>Email</Button>
            </div>

            <Button onclick={toggleMode} variant="outline" size="icon">
              <SunIcon
                class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
              />
              <MoonIcon
                class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
              />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  </div>
</header>
