import { Anton, Archivo } from 'next/font/google';
import Script from 'next/script';

import Navbar from '@/components/Navbar';
import { SuperTokensInit } from '@/components/Supertoken/Init';
import { ThemeProvider } from '@/components/ThemeProvider';
import { env } from '@/lib/env';
import axiosClientServer from '@/lib/helpers/axios/server';
import { Toaster } from '@/lib/toast';

import type { Metadata } from 'next';

import 'svgmap/dist/svgMap.min.css';
import './globals.css';

const geistSans = Archivo({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  // Core SEO - Title optimized for primary keywords
  title: {
    default: 'Domain Redirect Service with HTTPS - Free SSL | QuickLeap.io',
    template: '%s | QuickLeap - Domain Forwarding Made Easy',
  },

  // Description targeting user search intent
  description:
    'Professional domain redirect and URL forwarding service with automatic HTTPS/SSL, 301/302 redirects, path forwarding, and API support. Redirect unlimited domains without hosting hassles. Free trial available.',

  // Application metadata
  applicationName: 'Quickleap',

  // Keywords - High-intent commercial terms
  keywords: [
    'domain redirect service',
    'URL forwarding service',
    'domain forwarding',
    '301 redirect hosting',
    '302 redirect service',
    'HTTPS redirect',
    'SSL domain redirect',
    'automatic SSL redirect',
    'path forwarding service',
    'domain redirect API',
    'redirect service with HTTPS',
    'website redirect service',
    'URL redirect tool',
    'domain redirection service',
    'DNS redirect',
    'web forwarding service',
    'domain parking redirect',
    'multiple domain redirect',
    'redirect without hosting',
    'enterprise redirect service',
    'redirect manager',
    'URL redirect API',
    'domain migration tool',
    'website forwarding',
    'redirect tracking analytics',
  ],

  // Author information
  authors: [{ name: 'QuickLeap', url: 'https://quickleap.io' }],

  creator: 'QuickLeap',
  publisher: 'QuickLeap',

  // Robots - Allow full indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical and alternate URLs
  alternates: {
    canonical: 'https://quickleap.io',
    languages: {
      'en-US': 'https://quickleap.io',
    },
  },

  // Open Graph for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quickleap.io',
    siteName: 'QuickLeap - Domain Redirect Service',
    title: 'Professional Domain Redirect & URL Forwarding with Free SSL',
    description:
      'Redirect your domains effortlessly with automatic HTTPS support, 301/302 redirects, path forwarding, and powerful API. No hosting required. Enterprise-grade reliability.',
    images: [
      {
        url: 'https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/og.png',
        width: 1200,
        height: 630,
        alt: 'QuickLeap Domain Redirect Service Dashboard',
        type: 'image/png',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    site: '@quickleapio',
    creator: '@quickleapio',
    title: 'Domain Redirect Service with Automatic HTTPS | QuickLeap',
    description:
      'Set up domain redirects in seconds with free SSL certificates, path forwarding, and API access. Perfect for domain management, rebranding, and SEO.',
    images: ['https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/og.png'],
  },

  // Category for better classification
  category: 'Web Services',

  // Icons and favicons
  icons: {
    icon: '/favicon.ico',
  },

  // Web app manifest
  manifest: '/site.webmanifest',

  // Apple Web App settings
  appleWebApp: {
    capable: true,
    title: 'QuickLeap',
    statusBarStyle: 'black-translucent',
  },

  // Format detection
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // Additional metadata
  other: {
    'og:email': 'info@quickleap.io',
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.JSX.Element> => {
  const { data } = await axiosClientServer.get<UserResponse>('/auth/user');

  return (
    <html suppressHydrationWarning lang="en">
      <Script
        defer
        data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        src={env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
      ></Script>

      {/* Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17847300061"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17847300061');
        `}
      </Script>
      <SuperTokensInit>
        <body
          className={`${geistSans.className} text-primaryBlack ${anton.variable} bg-bg antialiased`}
        >
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="light"
          >
            <Navbar user={data || undefined} />
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SuperTokensInit>
    </html>
  );
};

export default RootLayout;
