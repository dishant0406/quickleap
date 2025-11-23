import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing - Manage Your Account & Payments',
  description:
    'View your billing summary, current plan details, usage statistics, and recent transactions. Manage your subscription and payment methods in one place.',
  alternates: {
    canonical: 'https://quickleap.io/app/billing',
  },
  openGraph: {
    title: 'Billing - Manage Your Account & Payments | Quickleap',
    description:
      'View your billing summary, current plan, usage, and transaction history. Manage your subscription easily.',
    url: 'https://quickleap.io/app/billing',
  },
  twitter: {
    title: 'Billing - Manage Your Account & Payments | Quickleap',
    description:
      'View your billing summary, current plan, usage, and transaction history. Manage your subscription easily.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
