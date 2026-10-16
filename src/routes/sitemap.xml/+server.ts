import { routes } from '$app/manifest';
import { resolve } from '$app/paths';
import { site } from '#lib/config/site.ts';

// Generated once at build time and served as a static file, no worker invocation.
export const prerender = true;

// Every route with a +page is a public page. Endpoint-only routes such as the
// /portfolio and /resume redirects (and this file) are excluded.
const paths = routes
  .filter((route) => route.page)
  .map((route) => {
    // Dynamic routes cannot be listed from the route table; fail the build
    // instead of silently shipping an incomplete sitemap.
    if (route.id.includes('[')) {
      throw new Error(`sitemap.xml: list the URLs for dynamic route ${route.id} explicitly`);
    }

    // resolve() turns a route id into a pathname, dropping route groups like (marketing).
    return resolve(route.id);
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
