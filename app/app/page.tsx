import { type Metadata } from 'next';

import Main from '@/components/Main';

export const metadata: Metadata = {
  title: 'Dashboard - Manage Your Domain Redirects',
  description:
    'Manage all your domain redirects in one place. View analytics, configure redirect rules, and monitor traffic for your domains with automatic HTTPS support.',
  openGraph: {
    title: 'Dashboard - Manage Your Domain Redirects | Quickleap',
    description:
      'Manage all your domain redirects in one place. View analytics, configure redirect rules, and monitor traffic for your domains.',
  },
  twitter: {
    title: 'Dashboard - Manage Your Domain Redirects | Quickleap',
    description:
      'Manage all your domain redirects in one place. View analytics, configure redirect rules, and monitor traffic for your domains.',
  },
};

const Home: React.FC = () => {
  return (
    <div className="text-primaryBlack">
      <Main />
    </div>
  );
};

export default Home;
