import { buildSitemapXml, getBaseSitemapEntries } from '@/lib/seo/sitemap';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(): Promise<Response> {
  const entries = await getBaseSitemapEntries();
  const xml = buildSitemapXml(entries);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
