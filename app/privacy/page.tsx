import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { privacyPolicyConfig } from '@/components/DynamicPage/pages';

export default function PrivacyPage(): React.ReactElement {
  return <DynamicPage config={privacyPolicyConfig} />;
}
