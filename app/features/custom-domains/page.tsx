import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { customDomainsConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(customDomainsConfig);

export default function CustomDomainsPage(): React.ReactElement {
  return <DynamicPage config={customDomainsConfig} />;
}
