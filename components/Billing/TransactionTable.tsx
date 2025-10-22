import React from 'react';

import { Receipt } from 'lucide-react';

import { TransactionRow } from '@/components/Billing/TransactionRow';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Transaction } from '@/lib/api/payment';

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        <Receipt className="mx-auto mb-4 h-12 w-12 opacity-50" />
        <p>No transactions found</p>
        <Button asChild className="mt-4" variant="neutral">
          <a href="/app/plans">View Plans</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
