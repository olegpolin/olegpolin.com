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

Variables are declared in `src/env.ts` and read from `.env.local` in development (copy `.env.example`) and from Cloudflare secrets in production (`npx wrangler secret put <NAME>`). All of them are optional: without them the site still builds and runs, and the Spotify widget shows its empty state.

### Spotify now-playing widget

The About page shows the track playing on Spotify right now, or the last one played. It needs a [Spotify developer app](https://developer.spotify.com/dashboard) and a refresh token for the account to display:

1. In the app's settings, add the redirect URI `http://127.0.0.1:8888/callback`. Nothing needs to listen there.
2. Open this URL (with your client ID) and approve:

   ```
   https://accounts.spotify.com/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played
   ```

   The browser lands on an unreachable `127.0.0.1` page; copy the `code` query parameter from its address bar.
3. Within a minute, exchange the code for a refresh token:

   ```sh
   curl -u "<CLIENT_ID>:<CLIENT_SECRET>" -d grant_type=authorization_code -d code=<CODE> -d redirect_uri=http://127.0.0.1:8888/callback https://accounts.spotify.com/api/token
   ```

4. Put `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and the `refresh_token` from the response as `SPOTIFY_REFRESH_TOKEN` in `.env.local`, and set the same three as Cloudflare secrets for production.
