<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
  import { cn } from '#lib/utils.ts';

  interface Props extends HTMLAnchorAttributes {
    href: string;
    children: Snippet;
  }

  let { href, class: className, children, ...rest }: Props = $props();
</script>

<a {href} class={cn('group/link inline-flex min-h-11 items-center gap-2 font-medium', className)} {...rest}>
  <span class="underline-offset-4 group-hover/link:underline">{@render children()}</span>
  <ArrowRightIcon class="size-4 stroke-[1.5]" />
</a>
