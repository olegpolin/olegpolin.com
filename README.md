# [olegpolin.com](https://olegpolin.com)

My portfolio

## Tech Stack

- **[Svelte](https://svelte.dev)** (Svelte 5) - frontend framework
- **[SvelteKit](https://svelte.dev/docs/kit)** (SvelteKit 3) - full-stack framework
- **[Tailwind CSS](https://tailwindcss.com)** (Tailwind 4) - styling
- **[shadcn-svelte](https://shadcn-svelte.com)** - UI components (built on **[bits-ui](https://bits-ui.com)**)
- **[Cloudflare Workers](https://developers.cloudflare.com/workers)** - Deployment

## Getting Started

```sh
npm i
npm run dev
```

## Environment variables

Declared in `src/env.ts`, read from `.env.local` locally (copy `.env.example`) and from Cloudflare secrets in production (`npx wrangler secret put <NAME>`). All are optional. The Spotify ones are explained in `src/lib/server/spotify.ts`.
