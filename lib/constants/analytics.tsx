import type { JSX } from 'react';

import { BarChart3, Clock, MonitorSmartphone, Settings, Shield, Target, Users } from 'lucide-react';

/**
 * Analytics tab configuration
 */
export interface AnalyticsTab {
  value: string;
  label: string;
  icon: JSX.Element;
}

/**
 * Available tabs in the analytics dashboard
 */
export const ANALYTICS_TABS: AnalyticsTab[] = [
  {
    value: 'overview',
    label: 'Overview',
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    value: 'audience',
    label: 'Audience',
    icon: <Users className="h-4 w-4" />,
  },
  {
    value: 'technology',
    label: 'Technology',
    icon: <MonitorSmartphone className="h-4 w-4" />,
  },
  {
    value: 'timing',
    label: 'Timing',
    icon: <Clock className="h-4 w-4" />,
  },
  {
    value: 'advanced',
    label: 'Advanced',
    icon: <Settings className="h-4 w-4" />,
  },
  {
    value: 'quality',
    label: 'Quality',
    icon: <Shield className="h-4 w-4" />,
  },
  {
    value: 'rules',
    label: 'Rules',
    icon: <Target className="h-4 w-4" />,
  },
];

/**
 * Area chart configuration for visits over time
 */
export const VISITS_OVER_TIME_AREAS = [
  { key: 'count', color: '#ffdc58', name: 'Total Visits' },
  { key: 'uniqueVisitors', color: '#e6c64f', name: 'Unique Visitors' },
];

/**
 * Area chart configuration for daily traffic
 */
export const DAILY_TRAFFIC_AREAS = [{ key: 'count', color: '#e6c64f', name: 'Total Visits' }];

/**
 * Bar chart configuration for hourly traffic
 */
export const HOURLY_TRAFFIC_BARS = [{ key: 'count', color: '#ffebc0', name: 'Visits' }];

/**
 * Pie chart color schemes
 */
export const PIE_CHART_COLORS = {
  default: ['#ffdc58', '#e6c64f', '#ffebc0', '#9b87f5', '#F59E0B'],
  browser: ['#33C3F0', '#F97316', '#10B981', '#9b87f5', '#F59E0B'],
  os: ['#10B981', '#33C3F0', '#F97316', '#9b87f5', '#F59E0B'],
};

/**
 * Data table column definitions
 */
export const TABLE_COLUMNS = {
  countries: [
    { key: 'location', title: 'Country' },
    { key: 'count', title: 'Visits' },
    {
      key: 'percentage',
      title: 'Percentage',
      render: (value: number) => `${value}%`,
    },
  ],
  countriesDetailed: [
    { key: 'location', title: 'Country' },
    { key: 'count', title: 'Visits' },
    { key: 'uniqueVisitors', title: 'Unique Visitors' },
    {
      key: 'percentage',
      title: 'Percentage',
      render: (value: number) => `${value}%`,
    },
  ],
  referrers: [
    { key: 'referrer', title: 'Source' },
    { key: 'count', title: 'Visits' },
    {
      key: 'percentage',
      title: 'Percentage',
      render: (value: number) => `${value}%`,
    },
  ],
  devices: [
    { key: 'name', title: 'Device' },
    { key: 'count', title: 'Visits' },
    {
      key: 'percentage',
      title: 'Percentage',
      render: (value: number) => `${value}%`,
    },
  ],
  browsers: [
    { key: 'name', title: 'Browser' },
    { key: 'count', title: 'Visits' },
    {
      key: 'percentage',
      title: 'Percentage',
      render: (value: number) => `${value}%`,
    },
  ],
  operatingSystems: [
    { key: 'name', title: 'OS' },
    { key: 'count', title: 'Visits' },
    {
      key: 'percentage',
      title: 'Percentage',
      render: (value: number) => `${value}%`,
    },
  ],
  languages: [
    { key: 'language', title: 'Language' },
    { key: 'count', title: 'Visits' },
    {
      key: 'percentage',
      title: 'Percentage',
      render: (value: number) => `${value}%`,
    },
  ],
};

/**
 * Default date range type
 */
export const DEFAULT_DATE_RANGE_TYPE = 'last30Days';

/**
 * Default API limit for destination URLs
 */
export const DESTINATION_URL_LIMIT = 10;
