import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { apiIntegrationConfig } from '@/components/DynamicPage/pages';

export default function ApiIntegrationPage(): React.ReactElement {
  return <DynamicPage config={apiIntegrationConfig} />;
}
