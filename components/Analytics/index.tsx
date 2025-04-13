'use client';

import React, { useEffect, useState } from 'react';

import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Clock,
  Globe,
  MonitorSmartphone,
  Users,
} from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getComparisonAnalytics,
  getDashboardSummary,
  getDeviceInfo,
  getGeographicData,
  getHitsOverTime,
  getHourlyTraffic,
  getReferrerData,
} from '@/lib/api';
import type { DateRangeType } from '@/utils/dateUtils';
import { formatTimeForChart, getDateRange } from '@/utils/dateUtils';

import { Card } from '../ui/card';

import AreaChart from './AreaChart';
import BarChart from './BarChart';
import DataTable from './DataTable';
import DateRangeSelector from './DateRangeSelector';
import PieChart from './PieChart';
import StatsCard from './StatsCard';
import WorldMap from './WorldMap';

import type {
  AnalyticsBreakdown,
  AnalyticsData,
  HourlyStatsData,
  IntervalAnalyticsData,
  LocationAnalyticsData,
  PeriodComparisonData,
  ReferrerAnalyticsData,
} from './type';

interface AnalyticsDashboardProps {
  redirectId: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ redirectId }) => {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('last30Days');
  const [dateRange, setDateRange] = useState(() => getDateRange(dateRangeType));
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Analytics data states
  const [dashboardData, setDashboardData] = useState<AnalyticsData | null>(null);
  const [timeData, setTimeData] = useState<IntervalAnalyticsData | null>(null);
  const [deviceData, setDeviceData] = useState<AnalyticsBreakdown | null>(null);
  const [geoData, setGeoData] = useState<LocationAnalyticsData | null>(null);
  const [referrerData, setReferrerData] = useState<ReferrerAnalyticsData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyStatsData | null>(null);
  const [comparisonData, setComparisonData] = useState<PeriodComparisonData | null>(null);

  // Handle date range changes
  const handleDateRangeChange = (start: Date, end: Date, type: DateRangeType) => {
    setDateRangeType(type);
    setDateRange({ start, end });
    loadData(start, end);
  };

  // Load dashboard data
  const loadData = async (start: Date, end: Date) => {
    setIsLoading(true);
    try {
      // Load dashboard overview data
      const dashboard = await getDashboardSummary(redirectId + '', {
        start: start.toISOString(),
        end: end.toISOString(),
      });
      setDashboardData(dashboard.data);

      // Load time series data
      const timeStats = await getHitsOverTime(redirectId, {
        start: start.toISOString(),
        end: end.toISOString(),
        interval: 'day',
      });
      setTimeData(timeStats.data || []);

      // Load device data
      const deviceStats = await getDeviceInfo(redirectId, {
        start: start.toISOString(),
        end: end.toISOString(),
      });
      setDeviceData(deviceStats.data);

      // Load geographic data
      const geoStats = await getGeographicData(redirectId, {
        start: start.toISOString(),
        end: end.toISOString(),
      });
      setGeoData(geoStats.data);

      // Load referrer data
      const referrerStats = await getReferrerData(redirectId, {
        start: start.toISOString(),
        end: end.toISOString(),
      });
      setReferrerData(referrerStats.data);

      // Load hourly data
      const hourlyStats = await getHourlyTraffic(redirectId, {
        start: start.toISOString(),
        end: end.toISOString(),
      });
      setHourlyData(hourlyStats.data);

      // Load comparison data
      const comparisonStats = await getComparisonAnalytics(redirectId, {
        start: start.toISOString(),
        end: end.toISOString(),
      });
      setComparisonData(comparisonStats.data);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData(dateRange.start, dateRange.end);
  }, [redirectId]);

  // Calculate period-over-period trends
  const getTrend = (metric: string) => {
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

  // Format device data for pie chart
  const getDevicesForPieChart = () => {
    if (!deviceData || !deviceData.devices) return [];

    return deviceData.devices.map((device: any) => ({
      name: device.name,
      value: device.count,
      percentage: device.percentage,
    }));
  };

  // Format browser data for pie chart
  const getBrowsersForPieChart = () => {
    if (!deviceData || !deviceData.browsers) return [];

    return deviceData.browsers.map((browser: any) => ({
      name: browser.name,
      value: browser.count,
      percentage: browser.percentage,
    }));
  };

  // Format OS data for pie chart
  const getOsForPieChart = () => {
    if (!deviceData || !deviceData.operatingSystems) return [];

    return deviceData.operatingSystems.map((os: any) => ({
      name: os.name,
      value: os.count,
      percentage: os.percentage,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Redirect Analytics</h1>
        <DateRangeSelector onDateRangeChange={handleDateRangeChange} />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full lg:w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent className="space-y-6" value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              description={`Across ${dateRangeType === 'custom' ? 'selected period' : dateRangeType}`}
              icon={<BarChart3 className="h-4 w-4" />}
              isLoading={isLoading}
              title="Total Visits"
              tooltipContent="Total number of times your redirect link was accessed"
              trend={getTrend('totalHits')}
              value={dashboardData?.overview?.totalHits || 0}
            />
            <StatsCard
              description="Based on unique IP addresses"
              icon={<Users className="h-4 w-4" />}
              isLoading={isLoading}
              title="Unique Visitors"
              tooltipContent="Estimated number of different people who accessed your link"
              value={dashboardData?.overview?.uniqueVisitors || 0}
            />
            <StatsCard
              description="Automated traffic"
              icon={<MonitorSmartphone className="h-4 w-4" />}
              isLoading={isLoading}
              title="Bot Percentage"
              tooltipContent="Percentage of visits from known bots and crawlers"
              value={`${dashboardData?.overview?.botsPercentage || 0}%`}
            />
            <StatsCard
              description="Per day in selected period"
              icon={<Clock className="h-4 w-4" />}
              isLoading={isLoading}
              title="Avg. Daily Visits"
              tooltipContent="Average number of daily visits during the selected period"
              trend={getTrend('dailyAverage')}
              value={Math.round(comparisonData?.currentPeriod?.dailyAverage || 0)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AreaChart
              areas={[
                { key: 'count', color: '#ffdc58', name: 'Total Visits' },
                { key: 'uniqueVisitors', color: '#e6c64f', name: 'Unique Visitors' },
              ]}
              data={timeData?.data || []}
              isLoading={isLoading}
              title="Visits Over Time"
            />
            <WorldMap
              data={geoData?.data || []}
              isLoading={isLoading}
              title="Geographic Distribution"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DataTable
              columns={[
                { key: 'location', title: 'Country' },
                { key: 'count', title: 'Visits' },
                {
                  key: 'percentage',
                  title: 'Percentage',
                  render: (value) => `${value}%`,
                },
              ]}
              data={(geoData?.data || []).slice(0, 6)}
              isLoading={isLoading}
              title="Top Countries"
            />
            <DataTable
              columns={[
                { key: 'referrer', title: 'Source' },
                { key: 'count', title: 'Visits' },
                {
                  key: 'percentage',
                  title: 'Percentage',
                  render: (value) => `${value}%`,
                },
              ]}
              data={(referrerData?.data || []).slice(0, 6)}
              isLoading={isLoading}
              title="Top Referrers"
            />
            <DataTable
              columns={[
                { key: 'name', title: 'Device' },
                { key: 'count', title: 'Visits' },
                {
                  key: 'percentage',
                  title: 'Percentage',
                  render: (value) => `${value}%`,
                },
              ]}
              data={deviceData?.devices?.slice(0, 6) || []}
              isLoading={isLoading}
              title="Top Devices"
            />
          </div>
        </TabsContent>

        {/* AUDIENCE TAB */}
        <TabsContent className="space-y-6" value="audience">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              icon={<Users className="h-4 w-4" />}
              isLoading={isLoading}
              title="Total Unique Visitors"
              value={dashboardData?.overview?.uniqueVisitors || 0}
            />
            <StatsCard
              icon={<Globe className="h-4 w-4" />}
              isLoading={isLoading}
              title="Countries Reached"
              value={(geoData?.data || []).length}
            />
            <StatsCard
              icon={
                (comparisonData?.comparison?.hitGrowth || 0) > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )
              }
              isLoading={isLoading}
              title="Visits Growth"
              value={`${(comparisonData?.comparison?.hitGrowth || 0).toFixed(1)}%`}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <WorldMap
              className="md:col-span-2"
              data={geoData?.data || []}
              isLoading={isLoading}
              title="Geographic Distribution"
            />

            <DataTable
              columns={[
                { key: 'location', title: 'Country' },
                { key: 'count', title: 'Visits' },
                { key: 'uniqueVisitors', title: 'Unique Visitors' },
                {
                  key: 'percentage',
                  title: 'Percentage',
                  render: (value) => `${value}%`,
                },
              ]}
              data={(geoData?.data || []).slice(0, 10)}
              isLoading={isLoading}
              title="Countries Breakdown"
            />

            <DataTable
              columns={[
                { key: 'referrer', title: 'Source' },
                { key: 'count', title: 'Visits' },
                {
                  key: 'percentage',
                  title: 'Percentage',
                  render: (value) => `${value}%`,
                },
              ]}
              data={referrerData?.data || []}
              isLoading={isLoading}
              title="Referrer Sources"
            />
          </div>
        </TabsContent>

        {/* TECHNOLOGY TAB */}
        <TabsContent className="space-y-6" value="technology">
          <div className="grid gap-4 md:grid-cols-3">
            <PieChart
              data={getDevicesForPieChart()}
              isLoading={isLoading}
              title="Device Distribution"
            />

            <PieChart
              colors={['#33C3F0', '#F97316', '#10B981', '#9b87f5', '#F59E0B']}
              data={getBrowsersForPieChart()}
              isLoading={isLoading}
              title="Browser Distribution"
            />

            <PieChart
              colors={['#10B981', '#33C3F0', '#F97316', '#9b87f5', '#F59E0B']}
              data={getOsForPieChart()}
              isLoading={isLoading}
              title="OS Distribution"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <DataTable
              columns={[
                { key: 'name', title: 'Browser' },
                { key: 'count', title: 'Visits' },
                {
                  key: 'percentage',
                  title: 'Percentage',
                  render: (value) => `${value}%`,
                },
              ]}
              data={deviceData?.browsers || []}
              isLoading={isLoading}
              title="Browsers Breakdown"
            />

            <DataTable
              columns={[
                { key: 'name', title: 'OS' },
                { key: 'count', title: 'Visits' },
                {
                  key: 'percentage',
                  title: 'Percentage',
                  render: (value) => `${value}%`,
                },
              ]}
              data={deviceData?.operatingSystems || []}
              isLoading={isLoading}
              title="Operating Systems"
            />
          </div>
        </TabsContent>

        {/* TIMING TAB */}
        <TabsContent className="space-y-6" value="timing">
          <div className="grid gap-4 md:grid-cols-3">
            <StatsCard
              description="Most visits during this hour"
              icon={<Clock className="h-4 w-4" />}
              isLoading={isLoading}
              title="Peak Hour"
              value={
                (hourlyData?.hourlyStats || []).length > 0
                  ? formatTimeForChart(
                      (hourlyData?.hourlyStats || []).reduce(
                        (max, hour) => (hour.count > max.count ? hour : max),
                        (hourlyData?.hourlyStats || [])?.[0]
                      ).hour
                    )
                  : ''
              }
            />

            <StatsCard
              description="Per day in selected period"
              isLoading={isLoading}
              title="Average Daily Visits"
              trend={getTrend('dailyAverage')}
              value={Math.round(comparisonData?.currentPeriod?.dailyAverage || 0)}
            />

            <StatsCard
              description={`Total for ${comparisonData?.currentPeriod?.label || 'selected period'}`}
              isLoading={isLoading}
              title="Period Total"
              trend={getTrend('totalHits')}
              value={comparisonData?.currentPeriod?.totalHits || 0}
            />
          </div>

          <div className="grid gap-4">
            <AreaChart
              areas={[{ key: 'count', color: '#e6c64f', name: 'Total Visits' }]}
              data={timeData?.data || []}
              isLoading={isLoading}
              title="Daily Traffic"
            />

            <BarChart
              bars={[{ key: 'count', color: '#ffebc0', name: 'Visits' }]}
              data={hourlyData?.hourlyStats || []}
              isLoading={isLoading}
              title="Hourly Traffic Distribution"
              xAxisFormatter={formatTimeForChart}
              xAxisKey="hour"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Traffic Comparison</h3>

              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-5 w-32 bg-muted rounded"></div>
                  <div className="h-8 w-24 bg-muted rounded"></div>
                  <div className="h-4 w-48 bg-muted rounded"></div>
                  <div className="h-5 w-32 bg-muted rounded mt-6"></div>
                  <div className="h-8 w-24 bg-muted rounded"></div>
                  <div className="h-4 w-48 bg-muted rounded"></div>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {comparisonData?.currentPeriod?.label}
                    </div>
                    <div className="text-2xl font-bold">
                      {comparisonData?.currentPeriod?.totalHits?.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {comparisonData?.currentPeriod?.dateRange?.start?.substring(0, 10)} -{' '}
                      {comparisonData?.currentPeriod?.dateRange?.end?.substring(0, 10)}
                    </div>
                  </div>

                  <div className="my-4 flex items-center">
                    <div
                      className={`text-sm font-medium ${(comparisonData?.comparison?.hitGrowth || 0) > 0 ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {(comparisonData?.comparison?.hitGrowth || 0) > 0 ? '+' : ''}
                      {(comparisonData?.comparison?.hitGrowth || 0)?.toFixed(1)}%
                    </div>
                    <div className="h-0.5 flex-1 bg-muted mx-3"></div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {comparisonData?.previousPeriod?.label}
                    </div>
                    <div className="text-2xl font-bold">
                      {comparisonData?.previousPeriod?.totalHits?.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {comparisonData?.previousPeriod?.dateRange?.start?.substring(0, 10)} -{' '}
                      {comparisonData?.previousPeriod?.dateRange?.end?.substring(0, 10)}
                    </div>
                  </div>
                </>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Daily Average Comparison</h3>

              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-5 w-32 bg-muted rounded"></div>
                  <div className="h-8 w-24 bg-muted rounded"></div>
                  <div className="h-4 w-48 bg-muted rounded"></div>
                  <div className="h-5 w-32 bg-muted rounded mt-6"></div>
                  <div className="h-8 w-24 bg-muted rounded"></div>
                  <div className="h-4 w-48 bg-muted rounded"></div>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {comparisonData?.currentPeriod?.label}
                    </div>
                    <div className="text-2xl font-bold">
                      {comparisonData?.currentPeriod?.dailyAverage?.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Average visits per day</div>
                  </div>

                  <div className="my-4 flex items-center">
                    <div
                      className={`text-sm font-medium ${(comparisonData?.comparison?.dailyAverageGrowth || 0) > 0 ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {(comparisonData?.comparison?.dailyAverageGrowth || 0) > 0 ? '+' : ''}
                      {(comparisonData?.comparison?.dailyAverageGrowth || 0)?.toFixed(1)}%
                    </div>
                    <div className="h-0.5 flex-1 bg-muted mx-3"></div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {comparisonData?.previousPeriod?.label}
                    </div>
                    <div className="text-2xl font-bold">
                      {comparisonData?.previousPeriod?.dailyAverage?.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Average visits per day</div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
