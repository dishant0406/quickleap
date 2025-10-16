import { type Metadata } from 'next';

import PlansDisplay from '@/components/Plans/PlansDisplay';
import { fetchPlans } from '@/lib/api/plans';

export const metadata: Metadata = {
  title: 'Pricing Plans - Choose Your Perfect Plan',
  description:
    'Flexible pricing plans for every need. From free tier with 5 redirects to enterprise solutions with unlimited redirects, advanced analytics, API access, and priority support.',
  keywords: [
    'domain redirect pricing',
    'URL forwarding plans',
    'redirect service pricing',
    'free domain redirect',
    'enterprise redirect solution',
    'redirect API pricing',
  ],
  openGraph: {
    title: 'Pricing Plans - Choose Your Perfect Plan | Quickleap',
    description:
      'Flexible pricing plans for domain redirects. Free tier available. Scale from 5 redirects to unlimited with advanced features.',
  },
  twitter: {
    title: 'Pricing Plans - Choose Your Perfect Plan | Quickleap',
    description:
      'Flexible pricing plans for domain redirects. Free tier available. Scale from 5 redirects to unlimited with advanced features.',
  },
};

export default async function PlansPage(): Promise<React.JSX.Element> {
  const plans = await fetchPlans();

  if (!plans || plans.length === 0) {
    return (
      <section className="from-primary/5 to-background flex min-h-screen w-full items-center justify-center bg-gradient-to-b">
        <div className="text-center">
          <p className="text-muted-foreground">No plans available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="from-primary/5 to-background w-full bg-gradient-to-b py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <PlansDisplay plans={plans} />
      </div>
    </section>
  );
}
