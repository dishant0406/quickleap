'use client';

import React from 'react';

import { Repeat, UserCheck, Users } from 'lucide-react';

import { Card } from '@/components/ui/card';

import PieChart from '../PieChart';
import type { ReturnVisitorAnalyticsData } from '../type';

interface ReturnVisitorsProps {
  data: ReturnVisitorAnalyticsData | null;
  isLoading: boolean;
}

const ReturnVisitors: React.FC<ReturnVisitorsProps> = ({ data, isLoading }) => {
  const getVisitDistributionChart = (): Array<{
    name: string;
    value: number;
    percentage: number;
  }> => {
    if (!data?.visitDistribution) return [];

    return Object.entries(data.visitDistribution).map(([visits, count]) => ({
      name: visits === '10+' ? '10+ visits' : `${visits} visits`,
      value: count,
      percentage: parseFloat(((count / data.returnVisitors) * 100).toFixed(1)),
    }));
  };

  const getNewVsReturningChart = (): Array<{ name: string; value: number; percentage: number }> => {
    if (!data) return [];

    return [
      {
        name: 'New Visitors',
        value: data.newVisitors,
        percentage: parseFloat(((data.newVisitors / data.totalUniqueVisitors) * 100).toFixed(1)),
      },
      {
        name: 'Return Visitors',
        value: data.returnVisitors,
        percentage: parseFloat(data.returnRate.toFixed(1)),
      },
    ];
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Unique Visitors</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.totalUniqueVisitors ? (
                <p className="text-2xl font-bold">{data.totalUniqueVisitors.toLocaleString()}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Return Visitors</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.returnVisitors ? (
                <p className="text-2xl font-bold">{data.returnVisitors.toLocaleString()}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Return Rate</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.returnRate !== undefined ? (
                <p className="text-2xl font-bold">{data.returnRate.toFixed(1)}%</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Visits per Returner</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : (
                <p className="text-2xl font-bold">{data?.averageVisitsPerReturnVisitor || '0'}</p>
              )}
            </div>
            <div className="h-4 w-4" />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PieChart
          colors={['#10B981', '#F59E0B']}
          data={getNewVsReturningChart()}
          isLoading={isLoading}
          title="New vs Return Visitors"
        />

        <PieChart
          colors={['#3B82F6', '#8B5CF6', '#F97316', '#EF4444', '#10B981']}
          data={getVisitDistributionChart()}
          isLoading={isLoading}
          title="Return Visitor Distribution"
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Visitor Engagement Insights</h3>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-3 text-sm text-muted-foreground">
            {data && (
              <>
                <p>
                  •{' '}
                  <span className="font-medium text-foreground">{data.returnRate.toFixed(1)}%</span>{' '}
                  of visitors return to your redirect link, indicating good user engagement
                </p>
                <p>
                  • Return visitors make an average of{' '}
                  <span className="font-medium text-foreground">
                    {data.averageVisitsPerReturnVisitor}
                  </span>{' '}
                  visits each
                </p>
                <p>
                  • You have{' '}
                  <span className="font-medium text-foreground">
                    {data.newVisitors.toLocaleString()}
                  </span>{' '}
                  new visitors and{' '}
                  <span className="font-medium text-foreground">
                    {data.returnVisitors.toLocaleString()}
                  </span>{' '}
                  returning visitors
                </p>
                {data.visitDistribution && Object.keys(data.visitDistribution).length > 0 && (
                  <p>
                    • Most frequent returners visit{' '}
                    <span className="font-medium text-foreground">
                      {
                        Object.entries(data.visitDistribution).reduce(
                          (max, [visits, count]) => (count > max.count ? { visits, count } : max),
                          { visits: '1', count: 0 }
                        ).visits
                      }
                    </span>{' '}
                    times
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReturnVisitors;
