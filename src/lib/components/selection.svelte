<!--
  The one selection on a page: a 1 px --select box with 24 px padding,
  12 px handles centred on the corners and a lowercase mono label above the top-left.
  With `reveal`, the box and label only show on hover (photo frames).
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils.ts';

  interface Props {
    label: string;
    reveal?: boolean;
    class?: string;
    children: Snippet;
  }

  let { label, reveal = false, class: className, children }: Props = $props();

  const handle = 'absolute size-3 rounded-[2px] border border-select bg-background';
  const fade = $derived(
    reveal && 'opacity-0 transition-opacity duration-100 group-hover/selection:opacity-100'
  );
</script>

<div
  class={cn(
    'group/selection relative border border-select p-6',
    reveal && 'border-transparent hover:border-select',
    className
  )}
>
  <span
    class={cn(
      'mono absolute -left-px bottom-[calc(100%+9px)] text-label whitespace-nowrap text-select-foreground',
      fade
    )}
    aria-hidden="true"
  >
    {label}
  </span>
  <span class={cn(handle, 'top-[-6.5px] left-[-6.5px]', fade)} aria-hidden="true"></span>
  <span class={cn(handle, 'top-[-6.5px] right-[-6.5px]', fade)} aria-hidden="true"></span>
  <span class={cn(handle, 'bottom-[-6.5px] left-[-6.5px]', fade)} aria-hidden="true"></span>
  <span class={cn(handle, 'right-[-6.5px] bottom-[-6.5px]', fade)} aria-hidden="true"></span>
  {@render children()}
</div>
