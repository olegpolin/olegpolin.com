<!-- The yellow (or outlined) pill that copies the address and reads "Copied" for two seconds. -->
<script lang="ts">
  import { Button, type ButtonSize, type ButtonVariant } from '#lib/components/ui/button/index.ts';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import { site } from '#lib/config/site.ts';

  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    class?: string;
  }

  let { variant = 'default', size = 'default', class: className }: Props = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      const field = document.createElement('textarea');
      field.value = site.email;
      document.body.append(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 2000);
  }
</script>

<Button {variant} {size} class={className} onclick={copy}>
  <CopyIcon data-icon="inline-start" />
  {copied ? 'Copied' : 'Copy email'}
</Button>
<span class="sr-only" aria-live="polite">{copied ? `Email address copied: ${site.email}` : ''}</span>
