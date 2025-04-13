import React from 'react';

import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  isLoading?: boolean;
  rowsPerPage?: number;
  className?: string;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  data,
  columns,
  isLoading = false,
  rowsPerPage = 10,
  className,
  onSort,
  sortKey,
  sortDirection,
}) => {
  // For skeleton loading
  const loadingData = Array.from({ length: rowsPerPage }, (_) => ({}));

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className="font-medium">
                  {column.sortable && onSort ? (
                    <Button
                      className="-ml-4 font-medium hover:bg-transparent hover:text-primary"
                      size="sm"
                      variant="default"
                      onClick={() => onSort(column.key)}
                    >
                      {column.title}
                      {sortKey === column.key ? (
                        sortDirection === 'asc' ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  ) : (
                    column.title
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              loadingData.map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={`loading-cell-${column.key}-${index}`}>
                      <div className="h-5 w-20 bg-muted animate-pulse rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {columns.map((column) => (
                    <TableCell key={`cell-${column.key}-${rowIndex}`}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center py-8" colSpan={columns.length}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
