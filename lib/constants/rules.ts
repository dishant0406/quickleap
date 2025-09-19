import type { AttributeKey, OperatorKey, RuleStatus } from '../types/rules';

// Attribute name mappings for human-readable display
export const ATTRIBUTE_NAMES: Record<AttributeKey, string> = {
  country: 'Country',
  region: 'Region',
  city: 'City',
  device_type: 'Device Type',
  device_brand: 'Device Brand',
  device_model: 'Device Model',
  browser_name: 'Browser',
  browser_version: 'Browser Version',
  os_name: 'Operating System',
  os_version: 'OS Version',
  referrer: 'Referrer',
  referrer_domain: 'Referrer Domain',
  hour_of_day: 'Hour of Day',
  day_of_week: 'Day of Week',
  language: 'Language',
  url_path: 'URL Path',
  query_param: 'Query Parameter',
  user_agent: 'User Agent',
  ip_address: 'IP Address',
} as const;

// Operator name mappings for human-readable display
export const OPERATOR_NAMES: Record<OperatorKey, string> = {
  equals: 'equals',
  not_equals: 'does not equal',
  contains: 'contains',
  not_contains: 'does not contain',
  starts_with: 'starts with',
  ends_with: 'ends with',
  in: 'is one of',
  not_in: 'is not one of',
  greater_than: 'is greater than',
  less_than: 'is less than',
  greater_equal: 'is greater than or equal to',
  less_equal: 'is less than or equal to',
  between: 'is between',
  exists: 'exists',
  not_exists: 'does not exist',
  regex: 'matches regex',
  ip_range: 'is in IP range',
} as const;

// Day names for formatting day_of_week values
export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

// Status badge variants mapping
export const STATUS_BADGE_VARIANTS: Record<RuleStatus, 'default' | 'neutral'> = {
  active: 'default',
  inactive: 'neutral',
  draft: 'neutral',
} as const;

// Type badge colors mapping
export const TYPE_BADGE_COLORS = {
  force: 'bg-blue-100 text-blue-800',
  percentage: 'bg-purple-100 text-purple-800',
  ab_experiment: 'bg-green-100 text-green-800',
} as const;

// Rule table constants
export const RULE_TABLE_MIN_WIDTH = 1200;
export const MAX_DISPLAYED_VARIANTS = 2;
export const MAX_DISPLAYED_CONDITIONS = 3;
