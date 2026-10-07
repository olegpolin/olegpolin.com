<script lang="ts">
  import Seo from '#lib/components/seo.svelte';
  import Contact from '#lib/components/contact.svelte';
  import DashedRule from '#lib/components/dashed-rule.svelte';
  import PageHead from '#lib/components/page-head.svelte';
  import Selection from '#lib/components/selection.svelte';
  import { clientWork, otherProjects, selected, type Project, type SelectedProject } from '#lib/data/work.ts';

  const indexSections: { title: string; projects: Project[] }[] = [
    { title: 'Client work', projects: clientWork },
    { title: 'Other projects', projects: otherProjects }
  ];
</script>

<Seo title="Work" />

<PageHead title="Work" lede="I like to build stuff. Here is all of it so far." />

<DashedRule />

{#snippet row({ name, href, line, year, cover }: SelectedProject)}
  <enhanced:img src={cover} alt="{name} home page" class="aspect-video w-full" />
  <div class="min-w-0">
    <a class="link block text-xl font-medium" {href}>{name}</a>
    <span class="block text-muted-foreground">{line}</span>
    <span class="mono mt-2 block text-sm text-muted-foreground">{year}</span>
  </div>
{/snippet}

<section class="px-4 py-20 md:px-8" aria-label="Selected">
  <div class="mx-auto max-w-300 md:px-8">
    <h2 class="mb-6 text-2xl font-medium">Selected</h2>
    <ol>
      {#each selected as project, i (project.href)}
        {#if i === 0}
          <li>
            <Selection
              label="flenze.com"
              class="my-8 -mx-3.25 grid gap-8 p-3 md:-mx-6.25 md:grid-cols-[400px_minmax(0,1fr)] md:p-6"
            >
              {@render row(project)}
            </Selection>
          </li>
        {:else}
          <li class={['grid gap-8 border-b py-8 md:grid-cols-[400px_minmax(0,1fr)]', i === 1 && 'border-t']}>
            {@render row(project)}
          </li>
        {/if}
      {/each}
    </ol>
  </div>
</section>

{#each indexSections as { title, projects } (title)}
  <DashedRule />

  <section class="px-4 py-20 md:px-8" aria-label={title}>
    <div class="mx-auto max-w-300 md:px-8">
      <h2 class="mb-6 text-2xl font-medium">{title}</h2>
      <ol>
        {#each projects as { name, href, line, year } (href)}
          <li class="grid grid-cols-[minmax(0,1fr)_72px] items-baseline gap-x-6 border-b py-4">
            <span>
              <a class="link text-lg font-medium" {href}>{name}</a>
              <span class="ml-3 text-muted-foreground">{line}</span>
            </span>
            <span class="mono text-right text-sm leading-6 text-muted-foreground">{year}</span>
          </li>
        {/each}
      </ol>
    </div>
  </section>
{/each}

<DashedRule />

<Contact line="Hiring, or want something built? Contact me." />

<DashedRule />
