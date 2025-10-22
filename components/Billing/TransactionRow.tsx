import React from 'react';

import { ExternalLink, Receipt } from 'lucide-react';

import { StatusBadge } from '@/components/Billing/StatusBadge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Transaction } from '@/lib/api/payment';
import { TRANSACTION_TYPE_COLORS, TRANSACTION_TYPE_ICONS } from '@/lib/constants/billing';
import { formatAmount, formatDate, formatType } from '@/lib/helpers/billing';

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const getTypeIcon = (type: string): React.ReactNode => {
    const IconComponent =
      TRANSACTION_TYPE_ICONS[type as keyof typeof TRANSACTION_TYPE_ICONS] ||
      TRANSACTION_TYPE_ICONS.default;
    const colorClass = TRANSACTION_TYPE_COLORS[type as keyof typeof TRANSACTION_TYPE_COLORS] || '';

    return <IconComponent className={`h-4 w-4 ${colorClass}`} />;
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          {getTypeIcon(transaction.type)}
          <span className="font-medium">{formatType(transaction.type)}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(transaction.paidAt || transaction.createdAt, true)}
      </TableCell>
      <TableCell>{transaction.plan?.name || 'N/A'}</TableCell>
      <TableCell>
        <div>
          <div className="font-medium">
            {formatAmount(transaction.amount, transaction.currency)}
          </div>
          {transaction.refundedAmount && transaction.refundedAmount > 0 ? (
            <div className="text-muted-foreground text-xs">
              Refunded: {formatAmount(transaction.refundedAmount, transaction.currency)}
            </div>
          ) : null}
        </div>
      </TableCell>
      <TableCell>
        <StatusBadge status={transaction.status} type="transaction" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {transaction.receiptUrl && (
            <Button asChild size="sm" tooltip="View Receipt" variant="neutral">
              <a href={transaction.receiptUrl} rel="noopener noreferrer" target="_blank">
                <Receipt className="h-4 w-4" />
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
          {transaction.invoiceUrl && (
            <Button asChild size="sm" tooltip="View Invoice" variant="neutral">
              <a href={transaction.invoiceUrl} rel="noopener noreferrer" target="_blank">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
