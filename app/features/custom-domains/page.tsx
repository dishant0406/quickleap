import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { customDomainsConfig } from '@/components/DynamicPage/pages';

export default function CustomDomainsPage(): React.ReactElement {
  return <DynamicPage config={customDomainsConfig} />;
}
