import React from 'react';

import Link from 'next/link';

import Logo from '@/components/Micro/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axiosClientServer from '@/lib/helpers/axios/server';

type CheckoutData = {
  id: string;
  status: string;
  amount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  product: {
    name: string;
    recurringInterval: string;
  };
};

type ApiResponse = {
  data: {
    success: boolean;
    data: CheckoutData;
  };
};

const Success = async (props: Props): Promise<React.JSX.Element> => {
  const dataProps = await props?.searchParams;
  const checkOutId = dataProps?.checkout_id;

  const response = (await axiosClientServer.get('/payment/checkout/' + checkOutId)) as ApiResponse;
  const checkoutData = response.data.data;

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div className="h-main md:px-[20vw] mt-nav overflow-y-auto p-4 md:p-8">
      <div className="w-full flex flex-col items-center">
        {/* Logo and Success Icon */}
        <div className="flex flex-col items-center mb-8">
          <Logo className="mb-6" height={90} width={180} />
          <div className="w-20 h-20 bg-main border-2 border-border rounded-full flex items-center justify-center shadow-shadow mb-4">
            <svg
              className="w-10 h-10 text-mtext"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
              />
            </svg>
          </div>
          <h1 className="text-4xl font-heading text-text mb-2">Payment Successful!</h1>
          <p className="text-text/70 text-center">
            Thank you for your purchase. Your subscription is now active.
          </p>
        </div>

        {/* Payment Details Card */}
        <Card className="mb-6 bg-bw md:w-[50vw]">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-2xl">Order Details</CardTitle>
            <CardDescription className="text-text/70">
              Transaction ID: {checkoutData.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Plan Details */}
            <div className="flex justify-between items-start pb-4 border-b border-border">
              <div>
                <p className="font-heading text-text text-lg">{checkoutData.product.name}</p>
                <p className="text-sm text-text/70 capitalize">
                  Billed {checkoutData.product.recurringInterval}ly
                </p>
              </div>
              <p className="font-heading text-text text-xl">
                {formatCurrency(checkoutData.amount, checkoutData.currency)}
              </p>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text/70 mb-1">Customer Name</p>
                <p className="font-base text-text">{checkoutData.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-text/70 mb-1">Email</p>
                <p className="font-base text-text">{checkoutData.customerEmail}</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-text">
                <span>Subtotal</span>
                <span>{formatCurrency(checkoutData.amount, checkoutData.currency)}</span>
              </div>
              <div className="flex justify-between text-text">
                <span>Discount</span>
                <span>{formatCurrency(checkoutData.discountAmount, checkoutData.currency)}</span>
              </div>
              <div className="flex justify-between text-text">
                <span>Tax</span>
                <span>{formatCurrency(checkoutData.taxAmount, checkoutData.currency)}</span>
              </div>
              <div className="flex justify-between text-text font-heading text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatCurrency(checkoutData.totalAmount, checkoutData.currency)}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-main border-2 border-border rounded-base">
                <div className="w-2 h-2 bg-mtext rounded-full" />
                <span className="text-sm font-base text-mtext capitalize">
                  {checkoutData.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link href="/app/subscription">View Subscription</Link>
          </Button>
          <Button asChild size="lg" variant="neutral">
            <Link href="/app">Go to Dashboard</Link>
          </Button>
        </div>

        {/* Support Text */}
        <p className="text-center text-sm text-text/70 mt-8">
          Questions about your order?{' '}
          <Link className="text-text hover:underline font-base" href="/contact">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

type Props = {
  searchParams?: {
    checkout_id?: string;
  };
};

export default Success;
