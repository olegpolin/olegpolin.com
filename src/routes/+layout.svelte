<script lang="ts">
  import './layout.css';
  import favicon from '#lib/assets/favicon.svg';
  import type { LayoutProps } from './$types';
  import { ModeWatcher } from 'mode-watcher';
  import Header from '#lib/components/header.svelte';

  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<div class="flex min-h-svh flex-col">
  <Header />

  <main class="flex-1">
    {@render children()}
  </main>
</div>
