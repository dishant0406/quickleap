import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { ruleBasedRedirectsConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(ruleBasedRedirectsConfig);

export default function RulesPage(): React.ReactElement {
  return <DynamicPage config={ruleBasedRedirectsConfig} />;
}
