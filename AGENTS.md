# AGENTS.md

Keep this file current: if a change makes anything here wrong or incomplete, update it in the same change.

## Tech Stack

See the Tech Stack section of `README.md`. If you add, remove, or change a core technology, update it in the same change.

Most of this tech stack had a recent major version, so your training data is likely stale. When unsure about an API, check the official docs instead of guessing.

## Skills

- Use the **svelte-code-writer** and **svelte-core-bestpractices** skills whenever you write or edit Svelte code. Remote functions are enabled, so use those. The enhanced-img plugin is added, so use that for images. Always check the official docs.
- Use the **shadcn-svelte** skill whenever you add or change UI. The component source lives in `src/lib/components/ui` and is ours to change: add components with the CLI as needed and edit existing ones freely.
- If a skill is missing, say so in your reply and ask the user to install it.

## Cursor Cloud specific instructions

`@sveltejs/kit` requires Node >= 22.17 and `.npmrc` sets `engine-strict`. The environment install puts Node 24.21.0 on `/opt/node` (matching GitHub Actions `node-version: lts/*`) and login shells prepend `/opt/node/bin`. The dev server listens on port 5173 (`npm run dev -- --host 0.0.0.0 --port 5173`). `npm run check` and `npm run build` are the verification commands; there is no test script. Resume compilation (`npm run resume:compile`) needs `typst` 0.15.1, which install places on `/usr/local/bin`. The site serves the committed PDF at `static/Oleg_Polin_Resume.pdf`.

## Git Commits & PRs

- No AI attribution anywhere: no `Co-Authored-By` or "Generated with" lines in commits, no `ai/` or `agent/` branch prefixes, nothing about the tool in PR titles or descriptions. If a tool put you on a generated branch, rename it before the first commit. Describe the change, not what made it.
- Write concise commit messages following the Conventional Commits spec and name branches after the change.
- Every change goes on a feature branch with a PR. Never push directly to `main`.
- If you push more commits after opening a PR, update its description to cover the full change set.
