import Script from 'next/script';

interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  siteName: string;
  siteUrl: string;
  imageUrl?: string;
}

export function WebPageSchema({
  name,
  description,
  url,
  siteName,
  siteUrl,
  imageUrl,
}: WebPageSchemaProps): React.JSX.Element {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
    ...(imageUrl && {
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="webpage-schema"
      type="application/ld+json"
    />
  );
}
