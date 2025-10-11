import type { AnalyticsBreakdown, PeriodComparisonData } from '@/components/Analytics/type';

/**
 * Pie chart data format for rendering
 */
export interface PieChartData {
  name: string;
  value: number;
  percentage: number;
}

/**
 * Trend data format
 */
export interface TrendData {
  value: number;
  isPositive: boolean;
}

/**
 * Calculate period-over-period trends for metrics
 */
export const getTrend = (
  metric: string,
  comparisonData: PeriodComparisonData | null
): TrendData | undefined => {
  if (!comparisonData) return undefined;

  let comparison = 0;

  switch (metric) {
    case 'totalHits':
      comparison = comparisonData.comparison.hitGrowth;
      break;
    case 'dailyAverage':
      comparison = comparisonData.comparison.dailyAverageGrowth;
      break;
    default:
      return undefined;
  }

  return {
    value: Math.abs(parseFloat(comparison.toFixed(1))),
    isPositive: comparison > 0,
  };
};

/**
 * Format device data for pie chart visualization
 */
export const getDevicesForPieChart = (deviceData: AnalyticsBreakdown | null): PieChartData[] => {
  if (!deviceData || !deviceData.devices) return [];

  return deviceData.devices.map((device) => ({
    name: device.name,
    value: device.count,
    percentage: device.percentage,
  }));
};

/**
 * Format browser data for pie chart visualization
 */
export const getBrowsersForPieChart = (deviceData: AnalyticsBreakdown | null): PieChartData[] => {
  if (!deviceData || !deviceData.browsers) return [];

  return deviceData.browsers.map((browser) => ({
    name: browser.name,
    value: browser.count,
    percentage: browser.percentage,
  }));
};

/**
 * Format OS data for pie chart visualization
 */
export const getOsForPieChart = (deviceData: AnalyticsBreakdown | null): PieChartData[] => {
  if (!deviceData || !deviceData.operatingSystems) return [];

  return deviceData.operatingSystems.map((os) => ({
    name: os.name,
    value: os.count,
    percentage: os.percentage,
  }));
};
