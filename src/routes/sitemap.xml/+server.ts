import { site } from '#lib/config/site.ts';

/* Prerendered at build time, so the sitemap is served as a static asset. */
export const prerender = true;

/*
 * Every +page.svelte under src/routes is a public, indexable page. Server-only routes
 * (+server.ts redirects) and the error page have no +page.svelte, so they are left out.
 */
const pages = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
  .map((file) => file.replace('/src/routes', '').replace(/\/?\+page\.svelte$/, '') || '/')
  .sort();

export function GET() {
  const urls = pages
    .map((path) => `  <url>\n    <loc>${new URL(path, site.url).href}</loc>\n  </url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
