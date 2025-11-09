import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { analyticsMonitoringConfig } from '@/components/DynamicPage/pages';

export default function AnalyticsPage(): React.ReactElement {
  return <DynamicPage config={analyticsMonitoringConfig} />;
}
