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
      {prevUrl && <link href={prevUrl} rel="prev" />}
      {nextUrl && <link href={nextUrl} rel="next" />}
      {currentPage > 1 && <meta content="noindex,follow" name="robots" />}
    </Head>
  );
}
