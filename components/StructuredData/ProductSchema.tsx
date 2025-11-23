import Script from 'next/script';

interface Offer {
  name: string;
  price: string;
  priceCurrency: string;
  description: string;
  billingDuration?: string;
}

interface ProductSchemaProps {
  offers: Offer[];
}

export function ProductSchema({ offers }: ProductSchemaProps): React.JSX.Element {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'QuickLeap Domain Redirect Service',
    description:
      'Professional domain redirect and URL forwarding service with automatic HTTPS/SSL, 301/302 redirects, path forwarding, and API support.',
    brand: {
      '@type': 'Brand',
      name: 'QuickLeap',
    },
    offers: offers.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      description: offer.description,
      availability: 'https://schema.org/InStock',
      url: 'https://quickleap.io/app/plans',
      ...(offer.billingDuration && {
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: offer.price,
          priceCurrency: offer.priceCurrency,
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: '1',
            unitCode: offer.billingDuration,
          },
        },
      }),
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="product-schema"
      type="application/ld+json"
    />
  );
}
