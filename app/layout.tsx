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
  title: 'Domain Redirecting Service hassle-free - quickleap.io',
  description:
    "Get peace of mind when redirecting your domains without the burden of hosting them. We are a domain redirect service with full HTTPS support and API compatibility. Enter your domain names and we'll take care of the rest.",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data } = await axiosClientServer.get<UserResponse>('/auth/user');

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta content="website" property="og:type" />
        <meta content={env.NEXT_PUBLIC_SITE_URL} property="og:url" />
        <meta content="Domain Redirecting Service hassle-free - quickleap.io" property="og:title" />
        <meta
          content="Get peace of mind when redirecting your domains without the burden of hosting them. We are a domain redirect service with full HTTPS support and API compatibility. Enter your domain names and we'll take care of the rest."
          property="og:description"
        />
        <meta content={env.NEXT_PUBLIC_OG_IMAGE_URL} property="og:image" />

        <meta content="summary_large_image" property="twitter:card" />
        <meta content={env.NEXT_PUBLIC_SITE_URL} property="twitter:url" />
        <meta
          content="Domain Redirecting Service hassle-free - quickleap.io"
          property="twitter:title"
        />
        <meta
          content="Get peace of mind when redirecting your domains without the burden of hosting them. We are a domain redirect service with full HTTPS support and API compatibility. Enter your domain names and we'll take care of the rest."
          property="twitter:description"
        />
        <meta content={env.NEXT_PUBLIC_OG_IMAGE_URL} property="twitter:image" />
      </head>
      <Script
        defer
        data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        src={env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
      ></Script>
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
