import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { ruleBasedRedirectsConfig } from '@/components/DynamicPage/pages';

export default function RulesPage(): React.ReactElement {
  return <DynamicPage config={ruleBasedRedirectsConfig} />;
}
