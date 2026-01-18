import { fetchBlogPostsForSitemap } from '@/lib/api/hashnode';
import { env } from '@/lib/env';

import { industries, topics } from './data';
import { getProgrammaticGeoPlaces } from './registry';

import type { Topic } from './types';
import type { MetadataRoute } from 'next';

const baseUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';

export const PROGRAMMATIC_SITEMAP_PAGE_SIZE = 1000;

export type ProgrammaticSitemapType = 'industry' | 'geo';

export type ProgrammaticSitemapDescriptor = {
  topicSlug: string;
  type: ProgrammaticSitemapType;
  pageIndex: number;
};

const getTopicBySlug = (slug: string): Topic | undefined =>
  topics.find((topic) => topic.slug === slug);

export const getProgrammaticSitemapPageCount = async (
  topicSlug: string,
  type: ProgrammaticSitemapType
): Promise<number> => {
  if (!getTopicBySlug(topicSlug)) {
    return 0;
  }

  if (type === 'industry') {
    const totalCount = industries.length + 1;
    return Math.ceil(totalCount / PROGRAMMATIC_SITEMAP_PAGE_SIZE);
  }

  const geoPlaces = await getProgrammaticGeoPlaces();
  return Math.ceil(geoPlaces.length / PROGRAMMATIC_SITEMAP_PAGE_SIZE);
};

export const getSitemapIndexUrls = async (siteUrl: string = baseUrl): Promise<string[]> => {
  const geoPlaces = await getProgrammaticGeoPlaces();
  const industryPages = Math.ceil((industries.length + 1) / PROGRAMMATIC_SITEMAP_PAGE_SIZE);
  const geoPages = Math.ceil(geoPlaces.length / PROGRAMMATIC_SITEMAP_PAGE_SIZE);
  const urls: string[] = [];

  topics.forEach((topic) => {
    for (let pageIndex = 0; pageIndex < industryPages; pageIndex += 1) {
      urls.push(`${siteUrl}/sitemap/topic-${topic.slug}-industry-${pageIndex}.xml`);
    }

    for (let pageIndex = 0; pageIndex < geoPages; pageIndex += 1) {
      urls.push(`${siteUrl}/sitemap/topic-${topic.slug}-geo-${pageIndex}.xml`);
    }
  });

  return urls;
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

export const getProgrammaticSitemapEntries = async (
  descriptor: ProgrammaticSitemapDescriptor
): Promise<MetadataRoute.Sitemap> => {
  const topic = getTopicBySlug(descriptor.topicSlug);
  if (!topic) {
    return [];
  }

  const start = descriptor.pageIndex * PROGRAMMATIC_SITEMAP_PAGE_SIZE;
  const end = start + PROGRAMMATIC_SITEMAP_PAGE_SIZE;
  let urls: string[] = [];

  if (descriptor.type === 'industry') {
    const allPaths = [
      `/solutions/${topic.slug}`,
      ...industries.map((industry) => `/solutions/${topic.slug}/${industry.slug}`),
    ];
    urls = allPaths.slice(start, end);
  } else {
    const geoPlaces = await getProgrammaticGeoPlaces();
    const pagePlaces = geoPlaces.slice(start, end);
    urls = pagePlaces.map(
      (place) => `/solutions/${topic.slug}/in/${place.slug}`
    );
  }

  const currentDate = new Date();

  return urls.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
};

export const parseProgrammaticSitemapFilename = (
  filename: string
): ProgrammaticSitemapDescriptor | null => {
  const match = filename.match(/^topic-([a-z0-9-]+)-(industry|geo)-(\d+)\.xml$/);
  if (!match) {
    return null;
  }

  const [, topicSlug, type, pageIndexValue] = match;
  const pageIndex = Number.parseInt(pageIndexValue, 10);

  if (Number.isNaN(pageIndex) || pageIndex < 0) {
    return null;
  }

  return {
    topicSlug,
    type: type as ProgrammaticSitemapType,
    pageIndex,
  };
};
