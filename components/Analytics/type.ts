export type AnalyticsData = {
  period: {
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  };
  overview: {
    totalHits: number;
    uniqueVisitors: number;
    botsPercentage: number;
    conversionRate: number;
  };
  topCountries: Array<{
    country: string;
    count: number;
    percentage: number;
  }>;
  topDevices: Array<{
    device: string;
    count: number;
    percentage: number;
  }>;
  topReferrers: Array<{
    referrer: string;
    count: number;
    percentage: number;
  }>;
  dailyTrends: Array<{
    date: string; // ISO date string
    count: number;
  }>;
};

export type IntervalAnalyticsData = {
  interval: string;
  data: Array<{
    date: string; // ISO date string
    count: number;
    uniqueVisitors: number;
  }>;
};

export type DeviceData = {
  name: string;
  count: number;
  percentage: number;
};

export type BrowserData = {
  name: string;
  count: number;
  percentage: number;
};

export type OperatingSystemData = {
  name: string;
  count: number;
  percentage: number;
};

export type AnalyticsBreakdown = {
  total: number;
  devices: DeviceData[];
  browsers: BrowserData[];
  operatingSystems: OperatingSystemData[];
};

export type LocationAnalyticsData = {
  groupBy: string;
  total: number;
  data: Array<{
    location: string;
    count: number;
    uniqueVisitors: number;
    percentage: number;
  }>;
};

export type ReferrerAnalyticsData = {
  total: number;
  data: Array<{
    referrer: string;
    count: number;
    percentage: number;
  }>;
};

export type HourlyStatsData = {
  hourlyStats: Array<{
    hour: number;
    count: number;
  }>;
  peakHour: {
    hour: number;
    count: number;
  };
};

export type PeriodComparisonData = {
  currentPeriod: {
    label: string;
    dateRange: {
      start: string; // ISO date string
      end: string; // ISO date string
    };
    totalHits: number;
    dailyAverage: number;
  };
  previousPeriod: {
    label: string;
    dateRange: {
      start: string; // ISO date string
      end: string; // ISO date string
    };
    totalHits: number;
    dailyAverage: number;
  };
  comparison: {
    hitGrowth: number;
    dailyAverageGrowth: number;
  };
};
