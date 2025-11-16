import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { easySetupConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(easySetupConfig);

export default function EasySetupPage(): React.ReactElement {
  return <DynamicPage config={easySetupConfig} />;
}
