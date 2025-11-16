import type { Metadata } from 'next';
import type { PageConfig } from './types';

/**
 * Generates Next.js metadata from a PageConfig object
 * This should be used in the page component to export metadata for SEO
 */
export function generateMetadataFromConfig(config: PageConfig): Metadata {
  const metadata: Metadata = {
    title: config.title,
    description: config.description,
  };

  // Handle robots (noindex)
  if (config.noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  // Handle keywords
  if (config.seo?.keywords && config.seo.keywords.length > 0) {
    metadata.keywords = config.seo.keywords;
  }

  // Handle Open Graph metadata
  if (config.description || config.seo?.ogImage) {
    metadata.openGraph = {
      title: config.title,
      description: config.description,
      type: 'website',
      ...(config.seo?.ogImage && {
        images: [
          {
            url: config.seo.ogImage,
            alt: config.title,
          },
        ],
      }),
    };
  }

  // Handle Twitter Card metadata
  if (config.description || config.seo?.ogImage) {
    metadata.twitter = {
      card: config.seo?.twitterCard || 'summary_large_image',
      title: config.title,
      description: config.description,
      ...(config.seo?.ogImage && {
        images: [config.seo.ogImage],
      }),
    };
  }

  // Handle authors
  if (config.seo?.authors && config.seo.authors.length > 0) {
    metadata.authors = config.seo.authors.map((name) => ({ name }));
  }

  // Handle canonical URL
  if (config.seo?.canonicalUrl) {
    metadata.alternates = {
      canonical: config.seo.canonicalUrl,
    };
  }

  // Handle favicon
  if (config.favicon) {
    metadata.icons = {
      icon: config.favicon,
    };
  }

  return metadata;
}
