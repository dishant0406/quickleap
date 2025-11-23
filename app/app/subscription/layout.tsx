import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription - Manage Your Plan',
  description:
    'Manage your subscription plan, view your current plan details, billing cycle, and subscription status. Cancel, reactivate, or upgrade your subscription anytime.',
  alternates: {
    canonical: 'https://quickleap.io/app/subscription',
  },
  openGraph: {
    title: 'Subscription - Manage Your Plan | Quickleap',
    description:
      'Manage your subscription plan, billing cycle, and status. Cancel, reactivate, or upgrade anytime.',
    url: 'https://quickleap.io/app/subscription',
  },
  twitter: {
    title: 'Subscription - Manage Your Plan | Quickleap',
    description:
      'Manage your subscription plan, billing cycle, and status. Cancel, reactivate, or upgrade anytime.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
