import { Anton, Archivo } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';

import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LOGOUT_ENDPOINT } from '@/lib/constants';
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
  const { data, error } = await axiosClientServer.get<UserResponse>('/api/auth/me');

  const BASE_URL = (await headers()).get('host');
  const PROTOCOL = (await headers()).get('x-forwarded-proto');

  const URL = `${PROTOCOL}://${BASE_URL}`;

  if (error) {
    const LOGOUT_URL = `${URL}${LOGOUT_ENDPOINT}`;
    await fetch(LOGOUT_URL, { method: 'GET' });
  }

  const userDetails = {
    email: data?.email,
    id: data?._id,
  };

  const encodedUserDetails = JSON.stringify(userDetails);
  const encodedUserDetailsBase64 = Buffer.from(encodedUserDetails).toString('base64');

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta content="website" property="og:type" />
        <meta content="https://quickleap.io" property="og:url" />
        <meta content="Domain Redirecting Service hassle-free - quickleap.io" property="og:title" />
        <meta
          content="Get peace of mind when redirecting your domains without the burden of hosting them. We are a domain redirect service with full HTTPS support and API compatibility. Enter your domain names and we'll take care of the rest."
          property="og:description"
        />
        <meta
          content="https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/redirect.png"
          property="og:image"
        />

        <meta content="summary_large_image" property="twitter:card" />
        <meta content="https://quickleap.io" property="twitter:url" />
        <meta
          content="Domain Redirecting Service hassle-free - quickleap.io"
          property="twitter:title"
        />
        <meta
          content="Get peace of mind when redirecting your domains without the burden of hosting them. We are a domain redirect service with full HTTPS support and API compatibility. Enter your domain names and we'll take care of the rest."
          property="twitter:description"
        />
        <meta
          content="https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/redirect.png"
          property="twitter:image"
        />
      </head>
      <Script
        defer
        data-website-id="18fa70dd-8676-4e59-acd6-a8f833f61282"
        src="https://cloud.umami.is/script.js"
      ></Script>
      <body
        className={`${geistSans.className} text-primaryBlack ${anton.variable} bg-bg antialiased`}
        data-body={encodedUserDetailsBase64}
      >
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute="class"
          defaultTheme="light"
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
