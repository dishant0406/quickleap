import { buildSitemapXml, getBaseSitemapEntries } from '@/lib/seo/sitemap';

export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const entries = await getBaseSitemapEntries();
  const xml = buildSitemapXml(entries);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
