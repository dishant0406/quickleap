import { env } from '@/lib/env';
import { buildSitemapIndexXml, getSitemapIndexUrls } from '@/lib/seo/sitemap';

export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';
  const programmaticUrls = await getSitemapIndexUrls(baseUrl);
  const urls = [`${baseUrl}/sitemap.xml`, ...programmaticUrls];
  const xml = buildSitemapIndexXml(urls);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
