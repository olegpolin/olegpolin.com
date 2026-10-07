<script lang="ts">
  interface Props {
    title: string;
    lede: string;
  }

  let { title, lede }: Props = $props();
</script>

<section class="px-4 pt-20 pb-16 text-center md:px-8 md:pt-30 md:pb-24">
  <h1 class="text-h2 font-medium md:text-title">{title}</h1>
  <p class="mx-auto mt-5 max-w-160 text-xl text-pretty text-muted-foreground">{lede}</p>
</section>
