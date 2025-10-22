import React from 'react';

import { StatusBadge } from '@/components/Billing/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Transaction } from '@/lib/api/payment';
import { formatAmount, formatDate } from '@/lib/helpers/billing';

interface RecentTransactionsProps {
  transactions: Transaction[];
  maxDisplay?: number;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  maxDisplay = 5,
}) => {
  const formatType = (type: string): string => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (transactions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button asChild size="sm" variant="neutral">
            <a href="/app/payment-history">View All</a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.slice(0, maxDisplay).map((transaction) => (
            <div
              key={transaction.id}
              className="border-border flex items-center justify-between rounded-lg border-2 p-3"
            >
              <div>
                <p className="font-medium">{formatType(transaction.type)}</p>
                <p className="text-muted-foreground text-xs">
                  {formatDate(transaction.paidAt || transaction.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  {formatAmount(transaction.amount, transaction.currency)}
                </p>
                <StatusBadge status={transaction.status} type="transaction" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
