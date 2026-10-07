export interface Project {
  name: string;
  href: string;
  line: string;
  year: string;
}

/* The four with a cover. */
export const selected: Project[] = [
  {
    name: 'Flenze',
    href: 'https://flenze.com',
    line: 'The stack your agent should have picked.',
    year: '2026'
  },
  {
    name: 'CustomersFly',
    href: 'https://customersfly.com',
    line: 'Customer retention system for restaurants.',
    year: '2026'
  },
  {
    name: 'material-expressive-svelte',
    href: 'https://github.com/olegpolin/material-expressive-svelte',
    line: 'Material Design 3 Expressive starter kit for agents.',
    year: '2026'
  },
  {
    name: 'neobrutalism-svelte',
    href: 'https://neobrutalism-svelte.flenze.com',
    line: 'Neobrutalism UI components for Svelte.',
    year: '2026'
  }
];

export const clientWork: Project[] = [
  {
    name: 'Ocrila',
    href: 'https://ocrila.com',
    line: 'Rebuilt the whole frontend for an AI voice agent that picks up restaurant phones.',
    year: '2026'
  },
  {
    name: 'News Into Action',
    href: 'https://newsintoaction.org',
    line: 'The first prototype of an app that turns the news into things you can actually do.',
    year: '2026'
  },
  {
    name: 'Chestnut Ventures Group',
    href: 'https://chestnutventuresgroup.com',
    line: 'The site of a venture firm.',
    year: '2025'
  },
  {
    name: 'PathCision Medicine',
    href: 'https://pathcisionmedicine.com',
    line: 'Company site for a biotech working on precision cancer therapies.',
    year: '2025'
  }
];

export const otherProjects: Project[] = [
  {
    name: 'material-svelte',
    href: 'https://github.com/olegpolin/material-svelte',
    line: 'Material Design components for Svelte.',
    year: '2026'
  },
  {
    name: 'neoplasticism-svelte',
    href: 'https://github.com/olegpolin/neoplasticism-svelte',
    line: "De Stijl components for Svelte, in Mondrian's colours.",
    year: '2026'
  },
  {
    name: 'shadcn-svelte-registry-template',
    href: 'https://github.com/olegpolin/shadcn-svelte-registry-template',
    line: 'A starter for publishing your own shadcn-svelte registry.',
    year: '2026'
  },
  {
    name: 'YourSplit',
    href: 'https://yoursplit.com',
    line: 'Build and share your workout split.',
    year: '2025'
  },
  { name: 'Gubbus', href: 'https://gubbus.com', line: 'A fun use of AI.', year: '2023' },
  {
    name: 'MakeAI',
    href: 'https://makeai.org',
    line: 'A drag-and-drop AI model builder, no code needed.',
    year: '2022'
  },
  { name: 'Ocelly', href: 'https://ocelly.com', line: 'Your tech shopping companion.', year: '2022' }
];

/* The three rows under "Also built" on the home page. */
export const alsoBuilt: Project[] = [selected[1], selected[3], clientWork[2]];
