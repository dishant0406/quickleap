'use client';

import Head from 'next/head';

interface SEOPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function SEOPagination({ currentPage, totalPages, baseUrl }: SEOPaginationProps) {
  const prevUrl =
    currentPage > 1 ? (currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`) : null;

  const nextUrl = currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : null;

  return (
    <Head>
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}
      {currentPage > 1 && <meta name="robots" content="noindex,follow" />}
    </Head>
  );
}
