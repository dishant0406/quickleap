import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { contactUsConfig } from '@/components/DynamicPage/pages';
import { BreadcrumbSchema } from '@/components/StructuredData';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(contactUsConfig);

export default function ContactPage(): React.ReactElement {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://quickleap.io' },
          { name: 'Contact Us', url: 'https://quickleap.io/contact' },
        ]}
      />
      <DynamicPage config={contactUsConfig} />
    </>
  );
}
