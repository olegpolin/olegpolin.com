import { site } from '#lib/config/site.ts';

// Generated once at build time and served as a static file, no worker invocation.
export const prerender = true;

// Every +page.svelte under src/routes is a public page. Endpoints such as the
// /portfolio and /resume redirects have no +page.svelte, so they are left out.
const paths = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
  .map((file) => {
    const path =
      file
        .slice('/src/routes'.length)
        // Strip the file name, including layout resets like +page@.svelte.
        .replace(/\/\+page(@[^/]*)?\.svelte$/, '')
        // Route groups like /(marketing) do not appear in URLs.
        .replace(/\/\([^/]+\)/g, '') || '/';

    // Dynamic routes cannot be listed from the file system; fail the build
    // instead of silently shipping an incomplete sitemap.
    if (path.includes('[')) {
      throw new Error(`sitemap.xml: list the URLs for dynamic route ${file} explicitly`);
    }

    return path;
  })
  .sort();

export function GET() {
  const urls = paths
    .map((path) => `  <url>\n    <loc>${new URL(path, site.url).href}</loc>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
