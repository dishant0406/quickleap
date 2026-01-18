import {
  buildSitemapXml,
  getProgrammaticSitemapEntries,
  getProgrammaticSitemapPageCount,
} from '@/lib/seo/sitemap';

export const revalidate = 3600;

interface RouteContext {
  params: Promise<{
    page: string;
  }>;
}

export async function GET(request: Request, { params }: RouteContext): Promise<Response> {
  const { page } = await params;
  const pageIndex = Number.parseInt(page.replace(/\.xml$/, ''), 10);

  if (Number.isNaN(pageIndex) || pageIndex < 0) {
    return new Response('Invalid sitemap page.', { status: 400 });
  }

  const pageCount = await getProgrammaticSitemapPageCount();

  if (pageIndex >= pageCount) {
    return new Response('Sitemap page not found.', { status: 404 });
  }

  const entries = await getProgrammaticSitemapEntries(pageIndex);
  const xml = buildSitemapXml(entries);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
