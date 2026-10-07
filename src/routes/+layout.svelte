<script lang="ts">
  import './layout.css';
  import favicon from '#lib/assets/favicon.svg';
  import type { LayoutProps } from './$types';
  import { ModeWatcher } from 'mode-watcher';
  import Header from '#lib/components/header.svelte';
  import Footer from '#lib/components/footer.svelte';
  import DashedRule from '#lib/components/dashed-rule.svelte';

  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<div class="flex min-h-svh flex-col">
  <Header />
  <DashedRule />

  <main class="relative flex-1">
    <!-- Dashed rails on the edges of the 1200 px frame. -->
    <div class="rule-y absolute inset-y-0 left-[calc(50%-600px)] hidden xl:block" aria-hidden="true"></div>
    <div class="rule-y absolute inset-y-0 right-[calc(50%-600px)] hidden xl:block" aria-hidden="true"></div>
    {@render children()}
  </main>

  <Footer />
</div>
