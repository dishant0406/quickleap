import React from 'react';

import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-muted-foreground text-sm">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          disabled={currentPage <= 1 || isLoading}
          size="sm"
          variant="neutral"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          Previous
        </Button>
        <Button
          disabled={currentPage >= totalPages || isLoading}
          size="sm"
          variant="neutral"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
