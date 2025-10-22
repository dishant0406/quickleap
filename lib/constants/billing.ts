/**
 * Billing Constants
 * Shared constants for billing, subscription, and payment history pages
 */

import {
  AlertCircle,
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCircle2,
  Loader2,
  Receipt,
  XCircle,
} from 'lucide-react';

/**
 * Pagination
 */
export const PAYMENT_HISTORY_PAGE_LIMIT = 10;

/**
 * Subscription status configuration
 */
export const SUBSCRIPTION_STATUS_CONFIG = {
  active: {
    label: 'Active',
    color: 'bg-green-500',
    icon: CheckCircle2,
  },
  trialing: {
    label: 'Trialing',
    color: 'bg-blue-500',
    icon: CalendarIcon,
  },
  canceled: {
    label: 'Canceled',
    color: 'bg-red-500',
    icon: XCircle,
  },
  revoked: {
    label: 'Revoked',
    color: 'bg-red-600',
    icon: XCircle,
  },
  past_due: {
    label: 'Past Due',
    color: 'bg-yellow-500',
    icon: AlertCircle,
  },
} as const;

/**
 * Transaction status configuration
 */
export const TRANSACTION_STATUS_CONFIG = {
  succeeded: {
    label: 'Succeeded',
    color: 'bg-green-500',
    icon: CheckCircle2,
  },
  failed: {
    label: 'Failed',
    color: 'bg-red-500',
    icon: XCircle,
  },
  refunded: {
    label: 'Refunded',
    color: 'bg-yellow-500',
    icon: ArrowUpIcon,
  },
  partially_refunded: {
    label: 'Partial Refund',
    color: 'bg-yellow-500',
    icon: ArrowUpIcon,
  },
  pending: {
    label: 'Pending',
    color: 'bg-blue-500',
    icon: Loader2,
  },
} as const;

/**
 * Transaction type icons
 */
export const TRANSACTION_TYPE_ICONS = {
  payment: ArrowDownIcon,
  subscription_cycle: ArrowDownIcon,
  refund: ArrowUpIcon,
  default: Receipt,
} as const;

/**
 * Transaction type colors
 */
export const TRANSACTION_TYPE_COLORS = {
  payment: 'text-green-600',
  subscription_cycle: 'text-green-600',
  refund: 'text-yellow-600',
} as const;

/**
 * Usage warning thresholds
 */
export const USAGE_THRESHOLDS = {
  warning: 70,
  danger: 90,
} as const;

/**
 * Quick links configuration
 */
export const BILLING_QUICK_LINKS = [
  {
    label: 'Manage Subscription',
    href: '/app/subscription',
  },
  {
    label: 'Payment History',
    href: '/app/payment-history',
  },
  {
    label: 'Billing Summary',
    href: '/app/billing',
  },
  {
    label: 'View Plans',
    href: '/app/plans',
  },
] as const;
