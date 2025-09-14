import { type JSX } from 'react';

import RulesManager from '@/components/Rules';

interface RedirectRulesProps {
  params: Promise<{ id: string }>;
}

const RedirectRules = async ({ params }: RedirectRulesProps): Promise<JSX.Element> => {
  const searchParams = await params;
  const id = searchParams?.id;

  return (
    <div className="h-main mt-nav overflow-y-auto p-4 md:p-8">
      <RulesManager redirectId={id} />
    </div>
  );
};

export default RedirectRules;
