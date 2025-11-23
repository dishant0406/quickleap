import Script from 'next/script';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  authorName: string;
  authorUrl?: string;
  imageUrl?: string;
  url: string;
}

export function BlogPostSchema({
  title,
  description,
  publishedAt,
  authorName,
  authorUrl,
  imageUrl,
  url,
}: BlogPostSchemaProps): React.JSX.Element {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    datePublished: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'QuickLeap',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/og.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="blog-post-schema"
      type="application/ld+json"
    />
  );
}
