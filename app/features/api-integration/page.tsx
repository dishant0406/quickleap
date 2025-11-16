import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { apiIntegrationConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(apiIntegrationConfig);

export default function ApiIntegrationPage(): React.ReactElement {
  return <DynamicPage config={apiIntegrationConfig} />;
}
