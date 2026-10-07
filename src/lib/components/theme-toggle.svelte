<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.ts';
  import { toggleMode } from 'mode-watcher';
  import MoonIcon from '@lucide/svelte/icons/moon';
  import SunIcon from '@lucide/svelte/icons/sun';
</script>

<Button variant="outline" size="icon" onclick={toggleMode} aria-label="Toggle theme">
  <MoonIcon class="size-5 dark:hidden" />
  <SunIcon class="hidden size-5 dark:block" />
</Button>
