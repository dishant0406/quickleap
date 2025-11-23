import Script from 'next/script';

export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QuickLeap',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'Professional domain redirect and URL forwarding service with automatic HTTPS/SSL, 301/302 redirects, path forwarding, and API support. Redirect unlimited domains without hosting hassles.',
    featureList: [
      'Automatic HTTPS/SSL',
      '301/302 Redirects',
      'Path Forwarding',
      'API Support',
      'Analytics & Monitoring',
      'Rule-Based Redirects',
      'Custom Domains',
    ],
    screenshot: 'https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/og.png',
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="software-application-schema"
      type="application/ld+json"
    />
  );
}
