import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { privacyPolicyConfig } from '@/components/DynamicPage/pages';
import { BreadcrumbSchema } from '@/components/StructuredData';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(privacyPolicyConfig);

export default function PrivacyPage(): React.ReactElement {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://quickleap.io' },
          { name: 'Privacy Policy', url: 'https://quickleap.io/privacy' },
        ]}
      />
      <DynamicPage config={privacyPolicyConfig} />
    </>
  );
}
