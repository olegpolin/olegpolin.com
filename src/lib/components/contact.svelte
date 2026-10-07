<!-- The closing line and pills before the footer. -->
<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.ts';
  import CopyEmail from '#lib/components/copy-email.svelte';
  import { site } from '#lib/config/site.ts';

  interface Props {
    line: string;
  }

  let { line }: Props = $props();
</script>

<section class="px-4 py-24 text-center" aria-label="Contact">
  <p class="text-2xl font-medium text-pretty">{line}</p>
  <div class="mt-8 flex flex-wrap justify-center gap-3">
    <CopyEmail />
    <Button variant="outline" href={site.resume}>Resume</Button>
  </div>
</section>
