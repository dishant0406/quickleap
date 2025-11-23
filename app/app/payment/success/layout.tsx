import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful - Thank You',
  description:
    'Your payment has been processed successfully. Thank you for your subscription. View your payment details and get started with your new plan.',
  alternates: {
    canonical: 'https://quickleap.io/app/payment/success',
  },
  openGraph: {
    title: 'Payment Successful - Thank You | Quickleap',
    description: 'Your payment has been processed successfully. Thank you for your subscription.',
    url: 'https://quickleap.io/app/payment/success',
  },
  twitter: {
    title: 'Payment Successful - Thank You | Quickleap',
    description: 'Your payment has been processed successfully. Thank you for your subscription.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
