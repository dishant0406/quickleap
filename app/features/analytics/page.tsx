import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { analyticsMonitoringConfig } from '@/components/DynamicPage/pages';
import { BreadcrumbSchema } from '@/components/StructuredData';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(analyticsMonitoringConfig);

export default function AnalyticsPage(): React.ReactElement {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://quickleap.io' },
          { name: 'Features', url: 'https://quickleap.io/#features' },
          { name: 'Analytics & Monitoring', url: 'https://quickleap.io/features/analytics' },
        ]}
      />
      <DynamicPage config={analyticsMonitoringConfig} />
    </>
  );
}
