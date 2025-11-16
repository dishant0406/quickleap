import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { analyticsMonitoringConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(analyticsMonitoringConfig);

export default function AnalyticsPage(): React.ReactElement {
  return <DynamicPage config={analyticsMonitoringConfig} />;
}
