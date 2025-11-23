import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment History - Transaction Records',
  description:
    'View your complete payment history and transaction records. Track all your payments, invoices, and billing activities with detailed transaction information.',
  alternates: {
    canonical: 'https://quickleap.io/app/payment-history',
  },
  openGraph: {
    title: 'Payment History - Transaction Records | Quickleap',
    description:
      'View your complete payment history and transaction records. Track all your payments and billing activities.',
    url: 'https://quickleap.io/app/payment-history',
  },
  twitter: {
    title: 'Payment History - Transaction Records | Quickleap',
    description:
      'View your complete payment history and transaction records. Track all your payments and billing activities.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
