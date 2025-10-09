import React from 'react';

import { Checkbox } from '@/components/ui/custom-checkbox';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableHeaderProps {
  onSelectAll?: (checked: boolean) => void;
}

export const Theader: React.FC<TableHeaderProps> = ({ onSelectAll }) => {
  return (
    <TableHeader className="bg-main border-b-4 border-border dark:border-darkNavBorder">
      <TableRow>
        <TableHead className="w-[48px] p-4">
          <Checkbox onCheckedChange={(e) => onSelectAll?.(e.valueOf() as boolean)} />
        </TableHead>
        <TableHead className="text-left p-4 text-text font-medium text-muted-foreground">
          Domain
        </TableHead>
        <TableHead className="text-center p-4 text-text font-medium text-muted-foreground">
          Usage
        </TableHead>
        <TableHead className="text-right p-4 text-text font-medium text-muted-foreground">
          Status
        </TableHead>
        <TableHead className="w-[48px] p-4"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
