import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { privacyPolicyConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(privacyPolicyConfig);

export default function PrivacyPage(): React.ReactElement {
  return <DynamicPage config={privacyPolicyConfig} />;
}
