'use client';

import { useEffect, useState } from 'react';

import {
  LoadingState,
  PageHeader,
  Pagination,
  QuickLinksCard,
  TransactionTable,
} from '@/components/Billing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPaymentHistory, type Transaction } from '@/lib/api/payment';
import { BILLING_QUICK_LINKS, PAYMENT_HISTORY_PAGE_LIMIT } from '@/lib/constants/billing';
import { errorToast } from '@/lib/toast';

export default function PaymentHistoryPage(): React.JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadHistory = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getPaymentHistory({
        page,
        limit: PAYMENT_HISTORY_PAGE_LIMIT,
      });
      if (response.success) {
        setTransactions(response.data.transactions);
        setTotalPages(response.data.pagination.totalPages);
        setTotal(response.data.pagination.total);
      }
    } catch (error) {
      console.error('Failed to load payment history:', error);
      errorToast('Failed to load payment history');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && page === 1) {
    return <LoadingState />;
  }

  const quickLinks = BILLING_QUICK_LINKS.filter((link) => link.href !== '/app/payment-history');

  return (
    <div className="h-main md:px-[20vw] mt-nav overflow-y-auto p-4 md:p-8">
      <PageHeader
        description="View all your transactions and payment records"
        title="Payment History"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                {total === 0 ? 'No transactions yet' : `${total} total transactions`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TransactionTable transactions={transactions} />

          {/* Pagination */}
          <Pagination
            currentPage={page}
            isLoading={isLoading}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-6">
        <QuickLinksCard links={quickLinks} />
      </div>
    </div>
  );
}
