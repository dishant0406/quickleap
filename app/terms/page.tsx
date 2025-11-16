import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { termsOfServiceConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(termsOfServiceConfig);

export default function TermsPage(): React.ReactElement {
  return <DynamicPage config={termsOfServiceConfig} />;
}
