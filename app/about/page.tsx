import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { aboutUsConfig } from '@/components/DynamicPage/pages';

export default function AboutPage(): React.ReactElement {
  return <DynamicPage config={aboutUsConfig} />;
}
