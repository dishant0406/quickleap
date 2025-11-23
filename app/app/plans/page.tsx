import { type Metadata } from 'next';

import PlansDisplay from '@/components/Plans/PlansDisplay';
import { BreadcrumbSchema, ProductSchema } from '@/components/StructuredData';
import { fetchPlans } from '@/lib/api/plans';

export const revalidate = 600; // Revalidate every hour

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
  alternates: {
    canonical: 'https://quickleap.io/app/plans',
  },
  openGraph: {
    title: 'Pricing Plans - Choose Your Perfect Plan | Quickleap',
    description:
      'Flexible pricing plans for domain redirects. Free tier available. Scale from 5 redirects to unlimited with advanced features.',
    url: 'https://quickleap.io/app/plans',
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

  // Transform plans data for JSON-LD schema
  const offers = plans.map((plan) => ({
    name: plan.name,
    price: plan.pricing?.amount?.toString() || '0',
    priceCurrency: plan.pricing?.currency || 'USD',
    description: plan.description || '',
    billingDuration: 'MON',
  }));

  return (
    <section className="from-primary/5 to-background w-full bg-gradient-to-b py-12 md:py-24 lg:py-32">
      <ProductSchema offers={offers} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://quickleap.io' },
          { name: 'Dashboard', url: 'https://quickleap.io/app' },
          { name: 'Pricing Plans', url: 'https://quickleap.io/app/plans' },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <PlansDisplay plans={plans} />
      </div>
    </section>
  );
}
