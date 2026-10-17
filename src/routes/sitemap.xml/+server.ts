import { routes } from '$app/manifest';
import { resolve } from '$app/paths';
import { site } from '#lib/config/site.ts';

// Generated at build time and served as a static file.
export const prerender = true;

// Every route with a +page is a public page; endpoint-only routes such as the /portfolio
// and /resume redirects (and this file) are left out. resolve() needs params for dynamic
// routes, so adding a [param] page fails type-check until its URLs are handled here.
const urls = routes
  .filter((route) => route.page)
  .map((route) => new URL(resolve(route.id), site.url).href)
  .sort();

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
