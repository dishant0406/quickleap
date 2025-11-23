import Script from 'next/script';

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'QuickLeap',
    url: 'https://quickleap.io',
    description:
      'Professional domain redirect and URL forwarding service with automatic HTTPS/SSL, 301/302 redirects, path forwarding, and API support.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://quickleap.io/app?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="website-schema"
      type="application/ld+json"
    />
  );
}
