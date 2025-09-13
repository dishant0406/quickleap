'use client';

import React from 'react';

import { ExternalLink, TrendingUp } from 'lucide-react';

import { Card } from '@/components/ui/card';

import DataTable from '../DataTable';
import type { DestinationUrlAnalyticsData } from '../type';

interface DestinationUrlsProps {
  data: DestinationUrlAnalyticsData | null;
  isLoading: boolean;
}

const DestinationUrls: React.FC<DestinationUrlsProps> = ({ data, isLoading }) => {
  const formatUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      const path = urlObj.pathname + urlObj.search;
      return path.length > 40 ? `${hostname}${path.substring(0, 40)}...` : `${hostname}${path}`;
    } catch {
      return url.length > 50 ? `${url.substring(0, 50)}...` : url;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Redirections</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.total ? (
                <p className="text-2xl font-bold">{data.total.toLocaleString()}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unique Destinations</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.data?.length ? (
                <p className="text-2xl font-bold">{data.data.length}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Top Destination</p>
              {isLoading ? (
                <div className="h-8 w-24 bg-muted rounded animate-pulse mt-2" />
              ) : data?.data?.[0]?.percentage ? (
                <p className="text-2xl font-bold">{data.data[0].percentage.toFixed(1)}%</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <div className="h-4 w-4" />
          </div>
          {!isLoading && data?.data?.[0] && (
            <p className="text-xs text-muted-foreground mt-1">
              {formatUrl(data.data[0].destinationUrl)}
            </p>
          )}
        </Card>
      </div>

      {data?.data && data.data.length > 0 ? (
        <DataTable
          columns={[
            {
              key: 'destinationUrl',
              title: 'Destination URL',
              render: (value) => (
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  <span className="font-mono text-xs" title={value}>
                    {formatUrl(value)}
                  </span>
                </div>
              ),
            },
            { key: 'count', title: 'Visits', render: (value) => value.toLocaleString() },
            {
              key: 'uniqueVisitors',
              title: 'Unique Visitors',
              render: (value) => value.toLocaleString(),
            },
            {
              key: 'percentage',
              title: 'Share',
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
          data={data.data}
          isLoading={isLoading}
          title="Destination URLs"
        />
      ) : !isLoading ? (
        <div className="flex items-center justify-center p-12 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground">No destination URL data available</p>
            <p className="text-sm text-muted-foreground">
              URL data will appear as users click on your redirects
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DestinationUrls;
