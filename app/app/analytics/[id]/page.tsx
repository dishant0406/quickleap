import { type Metadata } from 'next';

import AnalyticsDashboard from '@/components/Analytics';

interface RedirectAnalyticsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: RedirectAnalyticsProps): Promise<Metadata> {
  const searchParams = await params;
  const id = searchParams?.id;

  return {
    title: `Analytics - Redirect #${id}`,
    description: `View detailed analytics, traffic statistics, geographic distribution, device breakdown, and performance metrics for your redirect #${id}. Track clicks, monitor bot traffic, and analyze visitor patterns.`,
    openGraph: {
      title: `Analytics - Redirect #${id} | Quickleap`,
      description: `Comprehensive analytics dashboard for redirect #${id}. Monitor traffic, track performance, and analyze visitor patterns in real-time.`,
    },
    twitter: {
      title: `Analytics - Redirect #${id} | Quickleap`,
      description: `Comprehensive analytics dashboard for redirect #${id}. Monitor traffic, track performance, and analyze visitor patterns.`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

const RedirectAnalytics = async ({
  params,
}: RedirectAnalyticsProps): Promise<React.JSX.Element> => {
  const searchParams = await params;
  const id = searchParams?.id;

  return (
    <div className="h-main mt-nav overflow-y-auto p-4 md:p-8">
      <AnalyticsDashboard redirectId={id} />
    </div>
  );
};

export default RedirectAnalytics;
