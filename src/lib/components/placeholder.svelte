<!-- An honest grey frame with a mono label, until the real asset exists. -->
<script lang="ts">
  import { cn } from '#lib/utils.ts';

  interface Props {
    label: string;
    class?: string;
  }

  let { label, class: className }: Props = $props();
</script>

<div class={cn('mono flex items-end bg-secondary p-3 text-label text-foreground', className)}>
  {label}
</div>
