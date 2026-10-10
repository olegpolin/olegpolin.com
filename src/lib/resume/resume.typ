// Oleg Polin — resume
// Build: npm run resume:compile   (typst compile src/lib/resume/resume.typ static/Oleg_Polin_Resume.pdf)
// Live:  npm run resume:watch     (typst watch   src/lib/resume/resume.typ static/Oleg_Polin_Resume.pdf)
// Layout follows the single-column "Jake's Resume" structure, written in plain Typst
// with no package dependencies so it compiles anywhere.

// ───────────────────────── Page & type ─────────────────────────
#set document(title: "Oleg Polin — Resume", author: "Oleg Polin", date: none)
#set page(paper: "us-letter", margin: (x: 0.5in, top: 0.45in, bottom: 0.45in))
#set text(font: "New Computer Modern", size: 10.5pt, hyphenate: false)
#set par(justify: false, leading: 0.55em, spacing: 0.55em)
#show link: it => text(fill: black, style: "normal", it)

// ───────────────────────── Components ──────────────────────────
#let section(title) = {
  v(7pt)
  block(sticky: true, breakable: false, below: 4pt)[
    #text(size: 12pt, weight: "bold", smallcaps(title))
    #v(-2pt)
    #line(length: 100%, stroke: 0.7pt)
  ]
}

// Two-line entry header: bold title / date on line 1, italic subtitle / location on line 2.
#let entry(title, right1, subtitle: none, right2: none) = {
  let rows = (text(weight: "bold", title), text(weight: "bold", right1))
  if subtitle != none or right2 != none {
    rows.push(text(style: "italic", if subtitle == none { [] } else { subtitle }))
    rows.push(text(style: "italic", if right2 == none { [] } else { right2 }))
  }
  block(above: 8pt, below: 3pt, grid(columns: (1fr, auto), row-gutter: 3pt, ..rows))
}

#let items(..b) = list(
  marker: text(size: 8pt, sym.bullet),
  indent: 0.12in,
  body-indent: 0.5em,
  spacing: 0.5em,
  ..b.pos(),
)

#let skill(label, body) = block(above: 3pt, below: 3pt)[
  #text(weight: "bold", label): #body
]

// ───────────────────────── Header ──────────────────────────────
#align(center)[
  #text(size: 24pt, weight: "bold")[Oleg Polin]
  #v(4pt)
  #text(size: 10.5pt)[
    Boston, MA
    #h(0.5em) | #h(0.5em)
    #link("mailto:opolin@umass.edu")[opolin\@umass.edu]
    #h(0.5em) | #h(0.5em)
    #link("https://olegpolin.com")[olegpolin.com]
    #h(0.5em) | #h(0.5em)
    #link("https://github.com/olegpolin")[github.com/olegpolin]
    #h(0.5em) | #h(0.5em)
    #link("https://linkedin.com/in/olegpolin")[linkedin.com/in/olegpolin]
  ]
]

// ───────────────────────── Education ───────────────────────────
#section("Education")

#entry(
  [University of Massachusetts Amherst],
  [Amherst, MA],
  subtitle: [B.S. in Computer Science, completed in 2.5 years],
  right2: [Jan 2027],
)
#block(above: 0pt, below: 3pt)[
  #grid(
    columns: (1fr, auto),
    text(style: "italic")[M.S. in Computer Science (4+1 program)],
    text(style: "italic")[Expected Jan 2028],
  )
]

// ───────────────────────── Experience ──────────────────────────
#section("Experience")

#entry(
  [CustomersFly],
  [Jul 2026 -- Present],
  subtitle: [Founding Engineer #sym.dot.c #link("https://customersfly.com")[customersfly.com]],
  right2: [Belmont, MA],
)
#items(
  [Designed and built a repeat-customer platform for independent restaurants in SvelteKit, TypeScript, Tailwind CSS, and shadcn-svelte],
  [Designed the PostgreSQL schema and data layer (Drizzle ORM, Neon) and implemented auth with Better Auth],
  [Built the automated guest loop end to end: QR-card signup pages, welcome/reminder/review-request campaigns over email (Resend) and SMS (Twilio), and tracked short links for per-guest attribution],
  [Shipped the owner dashboard (signups, offer clicks, in-store redemptions, reviews) and a public demo mode],
)

#entry(
  [Ocrila],
  [Jun 2026 -- Jul 2026],
  subtitle: [Software Engineering Intern #sym.dot.c #link("https://ocrila.com")[ocrila.com]],
  right2: [Remote],
)
#items(
  [Rebuilt the full frontend of an AI voice-agent product for restaurants in four weeks (marketing site, owner dashboard, and admin pages) in Next.js, React, and TypeScript; 95+ Lighthouse scores in every category],
  [Refactored the frontend for maintainability; extended the admin dashboard's data layer and backend API routes],
)

#entry(
  [News Into Action],
  [Nov 2025 -- Feb 2026],
  subtitle: [Software Engineering Intern #sym.dot.c #link("https://newsintoaction.org")[newsintoaction.org]],
  right2: [Remote],
)
#items(
  [Built the prototype of a civic-engagement web app that turns news articles into concrete actions (SvelteKit, Tailwind CSS); it became the foundation of the product now in public beta],
  [Integrated the Perplexity API to generate media-bias and accuracy context for articles],
  [Set up Cloudflare Workers deployment workflows and analytics],
)

#entry(
  [Chestnut Ventures Group],
  [Jun 2025 -- Aug 2025],
  subtitle: [Software Engineering Intern #sym.dot.c #link("https://chestnutventuresgroup.com")[chestnutventuresgroup.com]],
  right2: [Remote],
)
#items(
  [Designed and built the investor-facing site for a venture firm leading Pre-Seed to Series A rounds (SvelteKit, Tailwind CSS), scoring 100 in all four Lighthouse categories],
  [Set up Cloudflare Workers deployment workflows from git push to production],
)

#entry(
  [PathCision Medicine],
  [Jan 2025],
  subtitle: [Software Engineering Intern #sym.dot.c #link("https://pathcisionmedicine.com")[pathcisionmedicine.com]],
  right2: [Remote],
)
#items(
  [Built and launched the company site for an AI-driven precision-therapeutics biotech (SvelteKit, Tailwind CSS); configured Cloudflare deployment with builds under 2 minutes],
)

#entry(
  [MakeAI],
  [Dec 2022 -- 2025],
  subtitle: [Co-Founder & Full-Stack Engineer #sym.dot.c #link("https://makeai.org")[makeai.org]],
  right2: [Remote],
)
#items(
  [Built the web app for a no-code, drag-and-drop AI model builder in Svelte, reaching 17k+ visitors],
  [Owned deployment and cloud infrastructure for the model-training backend on AWS, GCP, and Oracle Cloud],
)

// ───────────────────────── Projects ────────────────────────────
#section("Projects")

#entry(
  [YourSplit #sym.dot.c #text(weight: "regular", style: "italic")[SvelteKit, Supabase, Tailwind CSS, Groq API, Cloudflare Workers]],
  [#link("https://yoursplit.com")[yoursplit.com]],
)
#items(
  [Led a 4-person team building a web app for creating, saving, and sharing workout routines; live in production and open source],
  [Implemented Supabase auth (Google OAuth), PostgreSQL-backed routine storage and sharing, and an AI routine assistant via the Groq API; deployed to Cloudflare Workers],
)

#entry(
  [Open-Source Svelte UI Libraries #sym.dot.c #text(weight: "regular", style: "italic")[Svelte, shadcn-svelte, Tailwind CSS]],
  [#link("https://github.com/olegpolin")[github.com/olegpolin]],
)
#items(
  [Published neobrutalism-svelte, material-svelte, and neoplasticism-svelte, component libraries built on the shadcn-svelte registry system, with 100+ GitHub stars combined],
  [Maintain a shadcn-svelte registry starter and a SvelteKit + Supabase starter template],
)

// ───────────────────────── Skills ──────────────────────────────
#section("Technical Skills")

#skill([Languages], [TypeScript, JavaScript, Python, Java, C, C++, SQL])
#skill([Frontend], [Svelte, SvelteKit, React, Next.js, Tailwind CSS, shadcn-svelte])
#skill([Backend & Data], [Node.js, PostgreSQL, MongoDB, Drizzle ORM, Neon, Supabase, Better Auth, Resend, Twilio])
#skill([Cloud & DevOps], [AWS, GCP, Azure, Cloudflare Workers, Vercel, Docker, GitHub Actions, CI/CD])
