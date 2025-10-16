import { env } from '@/lib/env';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const currentDate = new Date();

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
  ];
}
