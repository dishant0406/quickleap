'use client';

import React from 'react';

import { Clock, TrendingUp } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { formatTimeForChart } from '@/utils/dateUtils';

import BarChart from '../BarChart';
import type { PeakTrafficAnalyticsData } from '../type';

interface PeakTrafficProps {
  data: PeakTrafficAnalyticsData | null;
  isLoading: boolean;
}

const PeakTraffic: React.FC<PeakTrafficProps> = ({ data, isLoading }) => {
  const getDayName = (dayOfWeek: number): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek] || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Peak Hour</p>
              {isLoading ? (
                <div className="h-8 w-20 bg-muted rounded animate-pulse mt-2" />
              ) : (
                <p className="text-2xl font-bold">
                  {data?.peakHour ? formatTimeForChart(data.peakHour.hour) : '--:--'}
                </p>
              )}
              {!isLoading && data?.peakHour && (
                <p className="text-xs text-muted-foreground mt-1">
                  {data.peakHour.count.toLocaleString()} visits
                </p>
              )}
            </div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Peak Day</p>
              {isLoading ? (
                <div className="h-8 w-24 bg-muted rounded animate-pulse mt-2" />
              ) : (
                <p className="text-2xl font-bold">
                  {data?.peakDay ? getDayName(data.peakDay.dayOfWeek) : 'Unknown'}
                </p>
              )}
              {!isLoading && data?.peakDay && (
                <p className="text-xs text-muted-foreground mt-1">
                  {data.peakDay.count.toLocaleString()} visits
                </p>
              )}
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BarChart
          bars={[{ key: 'count', color: '#fbbf24', name: 'Visits' }]}
          data={data?.hourlyDistribution || []}
          isLoading={isLoading}
          title="Traffic by Hour of Day"
          xAxisFormatter={formatTimeForChart}
          xAxisKey="hour"
        />

        <BarChart
          bars={[{ key: 'count', color: '#34d399', name: 'Visits' }]}
          data={data?.dailyDistribution || []}
          isLoading={isLoading}
          title="Traffic by Day of Week"
          xAxisFormatter={(dayOfWeek: number) => getDayName(dayOfWeek)}
          xAxisKey="dayOfWeek"
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Traffic Insights</h3>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-3 text-sm text-muted-foreground">
            {data?.peakHour && (
              <p>
                • Peak traffic occurs at{' '}
                <span className="font-medium text-foreground">
                  {formatTimeForChart(data.peakHour.hour)}
                </span>{' '}
                with {data.peakHour.count.toLocaleString()} visits
              </p>
            )}
            {data?.peakDay && (
              <p>
                • Most visits happen on{' '}
                <span className="font-medium text-foreground">
                  {getDayName(data.peakDay.dayOfWeek)}
                </span>{' '}
                with {data.peakDay.count.toLocaleString()} total visits
              </p>
            )}
            {data?.hourlyDistribution && data.hourlyDistribution.length > 0 && (
              <p>
                • Traffic patterns show {data.hourlyDistribution.filter((h) => h.count > 0).length}{' '}
                active hours throughout the day
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default PeakTraffic;
