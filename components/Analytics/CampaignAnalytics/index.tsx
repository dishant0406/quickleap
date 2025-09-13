'use client';

import React from 'react';

import { Target, TrendingUp, Users } from 'lucide-react';

import { Card } from '@/components/ui/card';

import DataTable from '../DataTable';
import PieChart from '../PieChart';
import type { CampaignAnalyticsData } from '../type';

interface CampaignAnalyticsProps {
  data: CampaignAnalyticsData | null;
  isLoading: boolean;
}

const CampaignAnalytics: React.FC<CampaignAnalyticsProps> = ({ data, isLoading }) => {
  const getCampaignChart = (): Array<{ name: string; value: number; percentage: number }> => {
    if (!data?.campaigns) return [];

    return data.campaigns.map((campaign) => ({
      name: `${campaign.utmSource}/${campaign.utmMedium}`,
      value: campaign.count,
      percentage: campaign.percentage,
    }));
  };

  const formatCampaignName = (campaign: {
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
  }): string => {
    const parts = [];
    if (campaign.utmSource) parts.push(campaign.utmSource);
    if (campaign.utmMedium) parts.push(campaign.utmMedium);
    if (campaign.utmCampaign) parts.push(campaign.utmCampaign);
    return parts.join(' / ') || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Traffic</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.totalTraffic ? (
                <p className="text-2xl font-bold">{data.totalTraffic.toLocaleString()}</p>
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
              <p className="text-sm font-medium text-muted-foreground">Campaign Traffic</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.totalCampaignTraffic ? (
                <p className="text-2xl font-bold">{data.totalCampaignTraffic.toLocaleString()}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <Target className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Campaign %</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.campaignTrafficPercentage !== undefined ? (
                <p className="text-2xl font-bold">{data.campaignTrafficPercentage.toFixed(1)}%</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data?.campaigns && data.campaigns.length > 0 ? (
          <>
            <PieChart
              colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
              data={getCampaignChart()}
              isLoading={isLoading}
              title="Campaign Traffic Distribution"
            />

            <DataTable
              columns={[
                {
                  key: 'utmSource',
                  title: 'Source',
                  render: (value, item) => (
                    <div className="space-y-1">
                      <div className="font-medium">{value || 'Unknown'}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.utmMedium || 'No medium'} • {item.utmCampaign || 'No campaign'}
                      </div>
                    </div>
                  ),
                },
                { key: 'count', title: 'Visits', render: (value) => value.toLocaleString() },
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
              data={data.campaigns}
              isLoading={isLoading}
              title="Campaign Performance"
            />
          </>
        ) : !isLoading ? (
          <div className="col-span-2 flex items-center justify-center p-12 text-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">No campaign data available</p>
              <p className="text-sm text-muted-foreground">
                Start using UTM parameters in your redirect URLs to track campaigns
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Campaign Insights</h3>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-3 text-sm text-muted-foreground">
            {data && data.totalTraffic > 0 ? (
              <>
                <p>
                  •{' '}
                  <span className="font-medium text-foreground">
                    {data.campaignTrafficPercentage.toFixed(1)}%
                  </span>{' '}
                  of your traffic comes from trackable campaigns
                </p>
                <p>
                  •{' '}
                  <span className="font-medium text-foreground">
                    {data.totalCampaignTraffic.toLocaleString()}
                  </span>{' '}
                  campaign visits out of{' '}
                  <span className="font-medium text-foreground">
                    {data.totalTraffic.toLocaleString()}
                  </span>{' '}
                  total visits
                </p>
                {data.campaigns && data.campaigns.length > 0 && (
                  <>
                    <p>
                      • Top performing campaign:{' '}
                      <span className="font-medium text-foreground">
                        {formatCampaignName(data.campaigns[0])}
                      </span>{' '}
                      ({data.campaigns[0].percentage.toFixed(1)}% of campaign traffic)
                    </p>
                    <p>
                      • You are tracking{' '}
                      <span className="font-medium text-foreground">{data.campaigns.length}</span>{' '}
                      different campaigns
                    </p>
                  </>
                )}
              </>
            ) : (
              <p>
                No campaign data available yet. UTM parameters will be tracked once traffic starts
                coming through your redirect.
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CampaignAnalytics;
