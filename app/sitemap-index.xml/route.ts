import { env } from '@/lib/env';
import { buildSitemapIndexXml, getSitemapIndexUrls } from '@/lib/seo/sitemap';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(): Promise<Response> {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';
  const urls = [`${baseUrl}/sitemap.xml`, ...getSitemapIndexUrls()];
  const xml = buildSitemapIndexXml(urls);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
