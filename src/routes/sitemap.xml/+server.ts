import { routes } from '$app/manifest';
import { resolve } from '$app/paths';
import { site } from '#lib/config/site.ts';

// Generated once at build time and served as a static file, no worker invocation.
export const prerender = true;

// URLs that cannot be derived from the route table, such as entries for dynamic
// routes like /blog/[slug]. Add pathnames here when such a route exists.
const extraPaths: string[] = [];

// Every route with a +page is a public page. Endpoint-only routes such as the
// /portfolio and /resume redirects (and this file) are excluded.
const pageIds = routes.filter((route) => route.page).map((route) => route.id);

// Dynamic routes cannot be listed from the route table; fail the build instead
// of silently shipping an incomplete sitemap.
const isStatic = (id: string): id is StaticPageId => !id.includes('[');
type StaticPageId = Exclude<(typeof pageIds)[number], `${string}[${string}`>;

const dynamic = pageIds.filter((id) => !isStatic(id));
if (dynamic.length > 0) {
  throw new Error(
    `sitemap.xml: add the URLs for dynamic route(s) ${dynamic.join(', ')} to extraPaths`
  );
}

// resolve() turns a route id into a pathname, dropping route groups like (marketing).
const paths = [...pageIds.filter(isStatic).map((id) => resolve(id)), ...extraPaths].sort();

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

export function GET() {
  const urls = paths
    .map((path) => `  <url>\n    <loc>${escapeXml(new URL(path, site.url).href)}</loc>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
