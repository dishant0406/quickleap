/**
 * Billing Helper Functions
 * Shared utility functions for billing, subscription, and payment history pages
 */

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string | null, includeTime = false): string => {
  if (!dateString) return 'N/A';

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Format a short date string (for compact displays)
 */
export const formatDateShort = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format amount in cents to currency string
 */
export const formatAmount = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

/**
 * Format transaction type from snake_case to Title Case
 */
export const formatType = (type: string): string => {
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Calculate usage percentage
 */
export const calculateUsagePercentage = (used: number, max: number): number => {
  if (max === -1) return 0; // Unlimited
  return Math.min((used / max) * 100, 100);
};

/**
 * Get color class based on usage percentage
 */
export const getUsageColor = (percentage: number): string => {
  if (percentage >= 90) return 'bg-red-500';
  if (percentage >= 70) return 'bg-yellow-500';
  return 'bg-green-500';
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format a feature name from camelCase to Title Case
 */
export const formatFeatureName = (key: string): string => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};
