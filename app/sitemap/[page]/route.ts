import {
  buildSitemapXml,
  getProgrammaticSitemapEntries,
  getProgrammaticSitemapPageCount,
} from '@/lib/seo/sitemap';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  if (pageIndex > getProgrammaticSitemapPageCount()) {
    return new Response('Sitemap page not found.', { status: 404 });
  }

  const entries = getProgrammaticSitemapEntries(pageIndex);
  const xml = buildSitemapXml(entries);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
