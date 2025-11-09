import React from 'react';

import { DynamicPage } from '@/components/DynamicPage';
import { contactUsConfig } from '@/components/DynamicPage/pages';

export default function ContactPage(): React.ReactElement {
  return <DynamicPage config={contactUsConfig} />;
}
