import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { termsOfServiceConfig } from '@/components/DynamicPage/pages';

export default function TermsPage(): React.ReactElement {
  return <DynamicPage config={termsOfServiceConfig} />;
}
