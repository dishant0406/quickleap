import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { aboutUsConfig } from '@/components/DynamicPage/pages';
import { BreadcrumbSchema } from '@/components/StructuredData';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(aboutUsConfig);

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://quickleap.io' },
          { name: 'About Us', url: 'https://quickleap.io/about' },
        ]}
      />
      <DynamicPage config={aboutUsConfig} />
    </>
  );
}
