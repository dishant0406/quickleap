import axiosClient from '../helpers/axios/client';

// Checkout
export interface CreateCheckoutParams {
  planId: string;
}

export interface CheckoutResponse {
  success: boolean;
  data: {
    checkoutUrl: string;
    checkoutId: string;
    expiresAt: string;
  };
  message: string;
}

export const createCheckoutSession = async (
  params: CreateCheckoutParams
): Promise<CheckoutResponse> => {
  const response = await axiosClient.post<CheckoutResponse>('/payment/checkout', params);
  return response.data;
};

// Subscription
export interface SubscriptionData {
  id: string;
  status:
    | 'active'
    | 'trialing'
    | 'canceled'
    | 'revoked'
    | 'past_due'
    | 'incomplete'
    | 'incomplete_expired';
  plan: Plan;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  trialStart: string | null;
  trialEnd: string | null;
  isActive: boolean;
  isTrialing: boolean;
  daysUntilRenewal: number | null;
  message?: string;
}

export interface GetSubscriptionResponse {
  success: boolean;
  data: {
    subscription: SubscriptionData | null;
  };
  message: string;
}

export const getCurrentSubscription = async (): Promise<GetSubscriptionResponse> => {
  const response = await axiosClient.get<GetSubscriptionResponse>('/payment/subscription');
  return response.data;
};

// Cancel Subscription
export interface CancelSubscriptionParams {
  immediately?: boolean;
  reason?: string;
}

export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
  data?: {
    subscription: SubscriptionData;
  };
}

export const cancelSubscription = async (
  params?: CancelSubscriptionParams
): Promise<CancelSubscriptionResponse> => {
  const response = await axiosClient.post<CancelSubscriptionResponse>(
    '/payment/subscription/cancel',
    params
  );
  return response.data;
};

// Reactivate Subscription
export interface ReactivateSubscriptionResponse {
  success: boolean;
  message: string;
  data?: {
    subscription: SubscriptionData;
  };
}

export const reactivateSubscription = async (): Promise<ReactivateSubscriptionResponse> => {
  const response = await axiosClient.post<ReactivateSubscriptionResponse>(
    '/payment/subscription/reactivate'
  );
  return response.data;
};

// Customer Portal
export interface CreatePortalParams {
  returnUrl?: string;
}

export interface PortalResponse {
  success: boolean;
  data: {
    portalUrl: string;
    expiresAt: string;
  };
  message: string;
}

export const createPortalSession = async (params?: CreatePortalParams): Promise<PortalResponse> => {
  const response = await axiosClient.post<PortalResponse>('/payment/portal', params);
  return response.data;
};

// Payment History
export interface Transaction {
  id: string;
  userId: string;
  subscriptionId: string;
  planId: string;
  provider: string;
  providerTransactionId: string;
  type: 'payment' | 'refund' | 'subscription_cycle' | 'setup_fee';
  status: 'succeeded' | 'failed' | 'pending' | 'refunded' | 'partially_refunded';
  amount: number;
  currency: string;
  taxAmount?: number;
  feeAmount?: number;
  refundedAmount?: number;
  paidAt: string | null;
  refundedAt: string | null;
  failedAt: string | null;
  receiptUrl?: string;
  invoiceUrl?: string;
  plan?: Plan;
  createdAt: string;
}

export interface PaymentHistoryParams {
  page?: number;
  limit?: number;
}

export interface PaymentHistoryResponse {
  success: boolean;
  data: {
    transactions: Transaction[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message: string;
}

export const getPaymentHistory = async (
  params?: PaymentHistoryParams
): Promise<PaymentHistoryResponse> => {
  const response = await axiosClient.get<PaymentHistoryResponse>('/payment/history', {
    params,
  });
  return response.data;
};

// Billing Summary
export interface BillingSummarySubscription {
  id: string;
  status:
    | 'active'
    | 'trialing'
    | 'canceled'
    | 'revoked'
    | 'past_due'
    | 'incomplete'
    | 'incomplete_expired';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  isTrialing: boolean;
  trialEnd: string | null;
}

export interface BillingSummaryUsageStats {
  redirectsUsed: number;
  lastUsageUpdate: string;
  totalAnalyticsEvents: number;
}

export interface BillingSummaryResponse {
  success: boolean;
  data: {
    currentPlan: Plan;
    subscription: BillingSummarySubscription | null;
    recentTransactions: Transaction[];
    usageStats: BillingSummaryUsageStats;
  };
  message: string;
}

export const getBillingSummary = async (): Promise<BillingSummaryResponse> => {
  const response = await axiosClient.get<BillingSummaryResponse>('/payment/billing');
  return response.data;
};

export const getCheckoutSession = async (id: string) => {
  const response = await axiosClient.get<CheckoutResponse>('/payment/checkout/' + id);
  return response.data;
};
