<script lang="ts">
  import Seo from '#lib/components/seo.svelte';
  import Contact from '#lib/components/contact.svelte';
  import DashedRule from '#lib/components/dashed-rule.svelte';
  import PageHead from '#lib/components/page-head.svelte';
  import Selection from '#lib/components/selection.svelte';

  const favorites: { title: string; items: { name: string; by?: string }[] }[] = [
    {
      title: 'Albums',
      items: [
        { name: 'Imaginal Disk', by: 'Magdalena Bay' },
        { name: 'Graduation', by: 'Kanye West' },
        { name: 'My Beautiful Dark Twisted Fantasy', by: 'Kanye West' }
      ]
    },
    {
      title: 'Artists',
      items: [
        { name: 'Magdalena Bay' },
        { name: 'Kanye West' },
        { name: 'Charli XCX' },
        { name: 'Lorde' },
        { name: 'Laufey' }
      ]
    },
    {
      title: 'Films',
      items: [
        { name: 'Interstellar', by: 'Christopher Nolan' },
        { name: 'Blade Runner 2049', by: 'Denis Villeneuve' },
        { name: 'Arrival', by: 'Denis Villeneuve' },
        { name: 'Everything Everywhere All at Once', by: 'Daniel Kwan and Daniel Scheinert' }
      ]
    },
    {
      title: 'Games',
      items: [
        { name: 'Journey', by: 'thatgamecompany' },
        { name: 'The Legend of Zelda: Breath of the Wild', by: 'Nintendo' },
        { name: 'Portal', by: 'Valve' }
      ]
    }
  ];
</script>

<Seo title="About" />

<PageHead title="About" lede="The short version." />

<DashedRule />

<section class="px-4 py-20" aria-label="About me">
  <div class="mx-auto flex max-w-170 flex-col gap-4">
    <p class="text-xl">
      I'm Oleg. I build web apps end to end, and I care as much about how they look as about how the code
      reads a year later.
    </p>
    <p class="text-pretty">
      I choose Svelte because simple code matters to me. Small codebases are easier to change, easier to
      hand over, and kinder to whoever opens them next.
    </p>
    <p class="text-pretty">
      With so much now made by machines, I still think the human part of making things matters.
    </p>
  </div>
</section>

<DashedRule />

<section class="flex justify-center px-4 py-28" aria-label="Favourite quote">
  <Selection label="earth - art = eh">
    <blockquote class="text-2xl font-medium">What is this earth without art? Just a rock.</blockquote>
  </Selection>
</section>

<DashedRule />

<section class="px-4 py-20" aria-labelledby="favorites">
  <div class="mx-auto max-w-170">
    <h2 class="mb-10 text-h2" id="favorites">Favorites</h2>
    <div class="grid gap-x-8 gap-y-14 md:grid-cols-2">
      {#each favorites as { title, items } (title)}
        <div>
          <h3 class="text-2xl font-medium">{title}</h3>
          <ul class="mt-3 border-t">
            {#each items as { name, by } (name)}
              <li class="border-b py-3">
                <span class="mr-3 font-medium">{name}</span>
                {#if by}
                  <span class="inline-block text-muted-foreground">{by}</span>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<DashedRule />

<Contact line="Thanks for reading this far. Say hello." />

<DashedRule />
