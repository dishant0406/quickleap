import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { aboutUsConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(aboutUsConfig);

export default function AboutPage(): React.ReactElement {
  return <DynamicPage config={aboutUsConfig} />;
}
