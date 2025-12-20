'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function BlogPagination({
  currentPage,
  totalPages,
}: BlogPaginationProps): React.JSX.Element | null {
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number): string => {
    const params = new URLSearchParams(searchParams.toString());

    if (pageNumber === 1) {
      // Remove page parameter for page 1 (cleaner URLs)
      params.delete('page');
    } else {
      params.set('page', pageNumber.toString());
    }

    const queryString = params.toString();
    return queryString ? `/blog?${queryString}` : '/blog';
  };

  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers max

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination logic
      if (currentPage <= 3) {
        // Show first pages + ellipsis + last
        for (let i = 1; i <= Math.min(4, totalPages); i++) {
          pages.push(i);
        }
        if (totalPages > 4) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show first + ellipsis + last pages
        pages.push(1);
        if (totalPages > 4) {
          pages.push('...');
        }
        for (let i = Math.max(totalPages - 3, 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first + ellipsis + current-1, current, current+1 + ellipsis + last
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center py-8">
      {/* Pagination controls */}
      <div className="flex items-center space-x-3">
        {/* Previous button */}
        {currentPage > 1 ? (
          <Button asChild size="icon" variant="neutral">
            <Link href={createPageUrl(currentPage - 1)} title="Previous page">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
        ) : (
          <Button disabled size="icon" variant="neutral">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Page numbers */}
        <div className="flex items-center space-x-2">
          {pageNumbers.map((page, index) => (
            <span key={index}>
              {page === '...' ? (
                <span className="flex h-10 w-10 items-center justify-center font-base text-text/40">
                  •••
                </span>
              ) : currentPage === page ? (
                <Button size="icon" variant="default">
                  {page}
                </Button>
              ) : (
                <Button asChild size="icon" variant="neutral">
                  <Link href={createPageUrl(page as number)}>{page}</Link>
                </Button>
              )}
            </span>
          ))}
        </div>

        {/* Next button */}
        {currentPage < totalPages ? (
          <Button asChild size="icon" variant="neutral">
            <Link href={createPageUrl(currentPage + 1)} title="Next page">
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        ) : (
          <Button disabled size="icon" variant="neutral">
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
