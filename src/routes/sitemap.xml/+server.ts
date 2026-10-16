import { site } from '#lib/config/site.ts';

/* Prerendered at build time, so the sitemap is served as a static asset. */
export const prerender = true;

/*
 * Every +page.svelte under src/routes is a public, indexable page. Server-only routes
 * (+server.ts redirects) and the error page have no +page.svelte, so they are left out.
 * Route groups like (marketing) are dropped from the URL. Dynamic routes like [slug] cannot
 * be listed from the file system, so adding one fails the build until it is handled here.
 */
const pages = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
  .map((file) => {
    const path =
      file
        .slice('/src/routes'.length)
        .replace(/\/\+page(@[^/]*)?\.svelte$/, '')
        .replace(/\/\([^/]+\)/g, '') || '/';
    if (path.includes('[')) {
      throw new Error(`sitemap.xml: dynamic route ${file} needs its URLs listed explicitly`);
    }
    return path;
  })
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

  /* The content type only matters in dev. In production the prerendered file is served as an asset. */
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
