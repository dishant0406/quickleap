import { useCallback, useEffect, useState } from 'react';

import type { AnalyticsState } from '@/components/Analytics/type';
import {
  getBotAnalytics,
  getCampaignAnalytics,
  getComparisonAnalytics,
  getDashboardSummary,
  getDestinationUrlAnalytics,
  getDeviceInfo,
  getErrorAnalytics,
  getGeographicData,
  getHitsOverTime,
  getHourlyTraffic,
  getLanguageAnalytics,
  getPeakTrafficAnalytics,
  getReferrerData,
  getReturnVisitorAnalytics,
} from '@/lib/api';
import { DESTINATION_URL_LIMIT } from '@/lib/constants/analytics';
import type { DateRangeType } from '@/utils/dateUtils';
import { getDateRange } from '@/utils/dateUtils';

/**
 * Return type for useAnalytics hook
 */
export interface UseAnalyticsReturn extends AnalyticsState {
  dateRangeType: DateRangeType;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleDateRangeChange: (start: Date, end: Date, type: DateRangeType) => void;
}

/**
 * Custom hook to manage analytics data state and loading
 */
export const useAnalytics = (redirectId: string): UseAnalyticsReturn => {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('last30Days');
  const [dateRange, setDateRange] = useState(() => getDateRange(dateRangeType));
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Analytics data state
  const [analyticsData, setAnalyticsData] = useState<AnalyticsState>({
    dashboardData: null,
    timeData: null,
    deviceData: null,
    geoData: null,
    referrerData: null,
    hourlyData: null,
    comparisonData: null,
    destinationUrlData: null,
    peakTrafficData: null,
    returnVisitorData: null,
    errorData: null,
    botData: null,
    campaignData: null,
    languageData: null,
  });

  /**
   * Handle date range changes
   */
  const handleDateRangeChange = useCallback((start: Date, end: Date, type: DateRangeType): void => {
    setDateRangeType(type);
    setDateRange({ start, end });
  }, []);

  /**
   * Load all analytics data
   */
  const loadData = useCallback(
    async (start: Date, end: Date): Promise<void> => {
      setIsLoading(true);
      try {
        const params = {
          start: start.toISOString(),
          end: end.toISOString(),
        };

        // Load all analytics data in parallel for better performance
        const [
          dashboard,
          timeStats,
          deviceStats,
          geoStats,
          referrerStats,
          hourlyStats,
          comparisonStats,
          destinationUrlStats,
          peakTrafficStats,
          returnVisitorStats,
          errorStats,
          botStats,
          campaignStats,
          languageStats,
        ] = await Promise.all([
          getDashboardSummary(redirectId + '', params),
          getHitsOverTime(redirectId, { ...params, interval: 'day' }),
          getDeviceInfo(redirectId, params),
          getGeographicData(redirectId, params),
          getReferrerData(redirectId, params),
          getHourlyTraffic(redirectId, params),
          getComparisonAnalytics(redirectId, params),
          getDestinationUrlAnalytics(redirectId, { ...params, limit: DESTINATION_URL_LIMIT }),
          getPeakTrafficAnalytics(redirectId, params),
          getReturnVisitorAnalytics(redirectId, params),
          getErrorAnalytics(redirectId, params),
          getBotAnalytics(redirectId, params),
          getCampaignAnalytics(redirectId, params),
          getLanguageAnalytics(redirectId, params),
        ]);

        // Update all state at once
        setAnalyticsData({
          dashboardData: dashboard.data,
          timeData: timeStats.data || [],
          deviceData: deviceStats.data,
          geoData: geoStats.data,
          referrerData: referrerStats.data,
          hourlyData: hourlyStats.data,
          comparisonData: comparisonStats.data,
          destinationUrlData: destinationUrlStats.data,
          peakTrafficData: peakTrafficStats.data,
          returnVisitorData: returnVisitorStats.data,
          errorData: errorStats.data,
          botData: botStats.data,
          campaignData: campaignStats.data,
          languageData: languageStats.data,
        });
      } catch (error) {
        console.error('Error loading analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [redirectId]
  );

  // Load data when date range changes
  useEffect(() => {
    loadData(dateRange.start, dateRange.end);
  }, [redirectId, dateRange.start, dateRange.end, loadData]);

  return {
    // State
    dateRangeType,
    isLoading,
    activeTab,
    setActiveTab,
    ...analyticsData,

    // Handlers
    handleDateRangeChange,
  };
};
