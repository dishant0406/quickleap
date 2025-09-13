'use client';

import React from 'react';

import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

import { Card } from '@/components/ui/card';

import DataTable from '../DataTable';
import PieChart from '../PieChart';
import type { ErrorAnalyticsData } from '../type';

interface ErrorAnalyticsProps {
  data: ErrorAnalyticsData | null;
  isLoading: boolean;
}

const ErrorAnalytics: React.FC<ErrorAnalyticsProps> = ({ data, isLoading }) => {
  const getStatusCodeChart = (): Array<{ name: string; value: number; percentage: number }> => {
    if (!data?.statusCodeDistribution) return [];

    return data.statusCodeDistribution.map((status) => ({
      name: `${status.statusCode}`,
      value: status.count,
      percentage: status.percentage,
    }));
  };

  const getStatusCodeColor = (statusCode: number): string => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600';
    if (statusCode >= 300 && statusCode < 400) return 'text-blue-600';
    if (statusCode >= 400 && statusCode < 500) return 'text-yellow-600';
    if (statusCode >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusCodeDescription = (statusCode: number): string => {
    const descriptions: Record<number, string> = {
      200: 'OK',
      301: 'Moved Permanently',
      302: 'Found (Temporary Redirect)',
      404: 'Not Found',
      500: 'Internal Server Error',
    };
    return descriptions[statusCode] || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.total ? (
                <p className="text-2xl font-bold">{data.total.toLocaleString()}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Successful</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.successCount !== undefined ? (
                <p className="text-2xl font-bold text-green-600">
                  {data.successCount.toLocaleString()}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Errors</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : (
                <p className="text-2xl font-bold text-red-600">
                  {data?.errorCount?.toLocaleString() || 0}
                </p>
              )}
            </div>
            <XCircle className="h-4 w-4 text-red-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : (
                <p
                  className={`text-2xl font-bold ${(data?.errorRate || 0) > 5 ? 'text-red-600' : (data?.errorRate || 0) > 1 ? 'text-yellow-600' : 'text-green-600'}`}
                >
                  {data?.errorRate?.toFixed(2) || 0}%
                </p>
              )}
            </div>
            <div className="h-4 w-4" />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data?.statusCodeDistribution && data.statusCodeDistribution.length > 0 ? (
          <>
            <PieChart
              colors={['#10B981', '#3B82F6', '#F59E0B', '#EF4444']}
              data={getStatusCodeChart()}
              isLoading={isLoading}
              title="Status Code Distribution"
            />

            <DataTable
              columns={[
                {
                  key: 'statusCode',
                  title: 'Status Code',
                  render: (value) => (
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold ${getStatusCodeColor(value)}`}>
                        {value}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {getStatusCodeDescription(value)}
                      </span>
                    </div>
                  ),
                },
                { key: 'count', title: 'Count', render: (value) => value.toLocaleString() },
                {
                  key: 'percentage',
                  title: 'Percentage',
                  render: (value) => (
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-muted rounded overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${Math.min(value, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs">{value.toFixed(1)}%</span>
                    </div>
                  ),
                },
              ]}
              data={data.statusCodeDistribution}
              isLoading={isLoading}
              title="Status Code Breakdown"
            />
          </>
        ) : !isLoading ? (
          <div className="col-span-2 flex items-center justify-center p-12 text-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">No error data available</p>
              <p className="text-sm text-muted-foreground">
                Error information will appear when requests encounter issues
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Error Analysis</h3>
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
                  • Overall error rate is{' '}
                  <span
                    className={`font-medium ${(data.errorRate || 0) > 5 ? 'text-red-600' : (data.errorRate || 0) > 1 ? 'text-yellow-600' : 'text-green-600'}`}
                  >
                    {data.errorRate.toFixed(2)}%
                  </span>
                  {data.errorRate < 1
                    ? ' - Excellent!'
                    : data.errorRate < 5
                      ? ' - Good'
                      : ' - Needs attention'}
                </p>
                <p>
                  •{' '}
                  <span className="font-medium text-green-600">
                    {data.successCount.toLocaleString()}
                  </span>{' '}
                  successful redirects out of{' '}
                  <span className="font-medium text-foreground">{data.total.toLocaleString()}</span>{' '}
                  total requests
                </p>
                {data.statusCodeDistribution && data.statusCodeDistribution.length > 0 && (
                  <p>
                    • Most common response:{' '}
                    <span
                      className={`font-medium ${getStatusCodeColor(data.statusCodeDistribution[0].statusCode)}`}
                    >
                      {data.statusCodeDistribution[0].statusCode}{' '}
                      {getStatusCodeDescription(data.statusCodeDistribution[0].statusCode)}
                    </span>{' '}
                    ({data.statusCodeDistribution[0].percentage.toFixed(1)}% of requests)
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

export default ErrorAnalytics;
