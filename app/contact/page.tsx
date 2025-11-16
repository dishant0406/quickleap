import React from 'react';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { contactUsConfig } from '@/components/DynamicPage/pages';

import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadataFromConfig(contactUsConfig);

export default function ContactPage(): React.ReactElement {
  return <DynamicPage config={contactUsConfig} />;
}
