import { fetchBlogPostsForSitemap } from '@/lib/api/hashnode';
import { env } from '@/lib/env';

import {
  getProgrammaticPathCount,
  getProgrammaticPathsChunk,
  isProgrammaticPathValid,
} from './registry';

import type { MetadataRoute } from 'next';

const baseUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';

export const PROGRAMMATIC_SITEMAP_PAGE_SIZE = 1000;

export const getProgrammaticSitemapPageCount = (): number =>
  Math.ceil(getProgrammaticPathCount() / PROGRAMMATIC_SITEMAP_PAGE_SIZE);

export const getSitemapIndexUrls = (): string[] => {
  const programmaticPages = getProgrammaticSitemapPageCount();
  return Array.from({ length: programmaticPages }, (_, index) => `${baseUrl}/sitemap/${index}.xml`);
};

export const buildSitemapIndexXml = (urls: string[]): string => {
  const items = urls
    .map(
      (url) => `<sitemap><loc>${url}</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`;
};

export const buildSitemapXml = (entries: MetadataRoute.Sitemap): string => {
  const items = entries
    .map(
      (entry) =>
        `<url><loc>${entry.url}</loc><lastmod>${new Date(
          entry.lastModified || new Date()
        ).toISOString()}</lastmod></url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
};

export const getBaseSitemapEntries = async (): Promise<MetadataRoute.Sitemap> => {
  const currentDate = new Date();
  const publicationHost = env.NEXT_PUBLIC_HASHNODE_HOST || 'blog.yourdomain.com';
  let allBlogPosts: Array<{ slug: string; publishedAt: string }> = [];

  try {
    let hasNextPage = true;
    let endCursor: string | null = null;

    while (hasNextPage) {
      const response = await fetchBlogPostsForSitemap(publicationHost, {
        first: 50,
        after: endCursor || undefined,
      });

      const posts = response.publication.posts.edges.map((edge) => ({
        slug: edge.node.slug,
        publishedAt: edge.node.publishedAt,
      }));

      allBlogPosts = [...allBlogPosts, ...posts];
      hasNextPage = response.publication.posts.pageInfo.hasNextPage;
      endCursor = response.publication.posts.pageInfo.endCursor;
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/app`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/app/plans`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/app/billing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/app/subscription`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/app/payment-history`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/features/easy-setup`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/analytics`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/custom-domains`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/rules`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/api-integration`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/security`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...allBlogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/auth/callback/github`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/auth/callback/google`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/llm.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
};

export const getProgrammaticSitemapEntries = (pageIndex: number): MetadataRoute.Sitemap => {
  const urls = getProgrammaticPathsChunk(pageIndex, PROGRAMMATIC_SITEMAP_PAGE_SIZE).filter(
    isProgrammaticPathValid
  );
  const currentDate = new Date();

  return urls.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
};
