import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { globalSecurityConfig } from '@/components/DynamicPage/pages';

export default function SecurityPage(): React.ReactElement {
  return <DynamicPage config={globalSecurityConfig} />;
}
