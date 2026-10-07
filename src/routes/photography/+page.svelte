<script lang="ts">
  import Seo from '#lib/components/seo.svelte';
  import DashedRule from '#lib/components/dashed-rule.svelte';
  import PageHead from '#lib/components/page-head.svelte';
  import Placeholder from '#lib/components/placeholder.svelte';
  import Selection from '#lib/components/selection.svelte';

  /* Ten frames until the photographs exist. Each will carry its year. */
  const photos = Array.from({ length: 10 }, (_, i) => ({ id: `photo-${i + 1}`, year: '[YEAR]' }));
</script>

<Seo title="Photography" />

<PageHead title="Photography" lede="I like taking pictures of everything. Here are some." />

<DashedRule />

<section class="px-4 py-20 md:px-8" aria-label="Photographs">
  <div class="mx-auto grid max-w-300 gap-x-8 gap-y-18 md:grid-cols-2 md:px-8">
    {#each photos as { id, year } (id)}
      <Selection label={year} reveal class="-m-3.25 p-3 md:-m-6.25 md:p-6">
        <Placeholder label="[PHOTO]" class="aspect-4/3" />
      </Selection>
    {/each}
  </div>
</section>

<DashedRule />
