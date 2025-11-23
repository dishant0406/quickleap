import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { termsOfServiceConfig } from '@/components/DynamicPage/pages';
import { BreadcrumbSchema } from '@/components/StructuredData';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(termsOfServiceConfig);

export default function TermsPage(): React.ReactElement {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://quickleap.io' },
          { name: 'Terms of Service', url: 'https://quickleap.io/terms' },
        ]}
      />
      <DynamicPage config={termsOfServiceConfig} />
    </>
  );
}
