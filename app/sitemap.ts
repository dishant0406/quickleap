import { fetchBlogPostsForSitemap } from '@/lib/api/hashnode';
import { env } from '@/lib/env';

import type { MetadataRoute } from 'next';

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const currentDate = new Date();

  // Fetch all blog posts for sitemap (lightweight - only slug and publishedAt)
  const publicationHost = process.env.NEXT_PUBLIC_HASHNODE_HOST || 'blog.yourdomain.com';
  let allBlogPosts: Array<{ slug: string; publishedAt: string }> = [];

  try {
    let hasNextPage = true;
    let endCursor: string | null = null;

    // Fetch all blog posts by paginating through them
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
    // Homepage - Landing page
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    // Main app dashboard
    {
      url: `${baseUrl}/app`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Plans page
    {
      url: `${baseUrl}/app/plans`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Billing page
    {
      url: `${baseUrl}/app/billing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Subscription management
    {
      url: `${baseUrl}/app/subscription`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Payment history
    {
      url: `${baseUrl}/app/payment-history`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // Feature pages
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
    // Company pages
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
    // Blog main page
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Blog posts - dynamically fetched
    ...allBlogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // GitHub OAuth callback (no-index for auth routes)
    {
      url: `${baseUrl}/auth/callback/github`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    // LLM.txt - AI-readable documentation
    {
      url: `${baseUrl}/llm.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Note: Dynamic routes like /app/analytics/[id] and /app/rules/[id]
    // are excluded as they require authentication and specific resource IDs
    // Payment success page is also excluded as it's a callback/confirmation page
  ];
}
