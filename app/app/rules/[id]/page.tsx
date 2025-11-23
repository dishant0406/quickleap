import { type JSX } from 'react';

import { type Metadata } from 'next';

import RulesManager from '@/components/Rules';

interface RedirectRulesProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: RedirectRulesProps): Promise<Metadata> {
  const searchParams = await params;
  const id = searchParams?.id;

  return {
    title: `Redirect Rules - Configure #${id}`,
    description: `Create and manage intelligent redirect rules for redirect #${id}. Set up conditional routing based on location, device type, browser, time-based rules, and custom conditions for advanced traffic management.`,
    alternates: {
      canonical: `https://quickleap.io/app/rules/${id}`,
    },
    openGraph: {
      title: `Redirect Rules - Configure #${id} | Quickleap`,
      description: `Create intelligent redirect rules for redirect #${id}. Configure conditional routing, A/B testing, and advanced traffic management.`,
      url: `https://quickleap.io/app/rules/${id}`,
    },
    twitter: {
      title: `Redirect Rules - Configure #${id} | Quickleap`,
      description: `Create intelligent redirect rules for redirect #${id}. Configure conditional routing and advanced traffic management.`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
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
