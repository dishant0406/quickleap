import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { globalSecurityConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(globalSecurityConfig);

export default function SecurityPage(): React.ReactElement {
  return <DynamicPage config={globalSecurityConfig} />;
}
