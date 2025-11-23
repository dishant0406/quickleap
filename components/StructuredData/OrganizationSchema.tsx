import Script from 'next/script';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QuickLeap',
    url: 'https://quickleap.io',
    logo: 'https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/og.png',
    description:
      'Professional domain redirect and URL forwarding service with automatic HTTPS/SSL, 301/302 redirects, path forwarding, and API support.',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'info@quickleap.io',
      availableLanguage: ['English'],
    },
    sameAs: ['https://twitter.com/quickleapio'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="organization-schema"
      type="application/ld+json"
    />
  );
}
