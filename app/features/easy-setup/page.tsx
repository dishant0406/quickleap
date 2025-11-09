import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { easySetupConfig } from '@/components/DynamicPage/pages';

export default function EasySetupPage(): React.ReactElement {
  return <DynamicPage config={easySetupConfig} />;
}
