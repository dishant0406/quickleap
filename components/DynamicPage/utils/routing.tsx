import React from 'react';

import { notFound } from 'next/navigation';

import { pageConfigs, type PageConfigKey } from '@/components/DynamicPage/pages';
import type { PageConfig } from '@/components/DynamicPage/types';

import DynamicPage from '../DynamicPage';

interface DynamicPageRouteProps {
  params: {
    slug: string;
  };
}

/**
 * Generic dynamic page component that can render any page configuration
 * based on the slug parameter. Useful for catch-all routes.
 *
 * Usage in Next.js App Router:
 *
 * // app/pages/[slug]/page.tsx
 * export default function DynamicPageRoute({ params }: { params: { slug: string } }) {
 *   return <DynamicPageRoute params={params} />;
 * }
 */
export default function DynamicPageRoute({ params }: DynamicPageRouteProps): React.ReactElement {
  const { slug } = params;

  // Check if the slug exists in our page configurations
  if (!(slug in pageConfigs)) {
    notFound();
  }

  const config = pageConfigs[slug as PageConfigKey];

  return <DynamicPage config={config} />;
}

/**
 * Get all available page slugs for static generation
 */
export function getPageSlugs(): string[] {
  return Object.keys(pageConfigs);
}

/**
 * Check if a slug is valid
 */
export function isValidPageSlug(slug: string): slug is PageConfigKey {
  return slug in pageConfigs;
}

/**
 * Get page configuration by slug
 */
export function getPageConfig(slug: string): PageConfig | null {
  if (!isValidPageSlug(slug)) {
    return null;
  }

  return pageConfigs[slug];
}
