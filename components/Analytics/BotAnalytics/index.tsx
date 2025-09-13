'use client';

import React from 'react';

import { Activity, Bot, Users } from 'lucide-react';

import { Card } from '@/components/ui/card';

import AreaChart from '../AreaChart';
import type { BotAnalyticsData } from '../type';

interface BotAnalyticsProps {
  data: BotAnalyticsData | null;
  isLoading: boolean;
}

const BotAnalytics: React.FC<BotAnalyticsProps> = ({ data, isLoading }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Traffic</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.total ? (
                <p className="text-2xl font-bold">{data.total.toLocaleString()}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Human Traffic</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.humanCount !== undefined ? (
                <p className="text-2xl font-bold text-green-600">
                  {data.humanCount.toLocaleString()}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <Users className="h-4 w-4 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bot Traffic</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.botCount !== undefined ? (
                <p className="text-2xl font-bold text-orange-600">
                  {data.botCount.toLocaleString()}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <Bot className="h-4 w-4 text-orange-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bot Percentage</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
              ) : data?.botPercentage !== undefined ? (
                <p
                  className={`text-2xl font-bold ${data.botPercentage > 50 ? 'text-red-600' : data.botPercentage > 20 ? 'text-yellow-600' : 'text-green-600'}`}
                >
                  {data.botPercentage.toFixed(1)}%
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
            <div className="h-4 w-4" />
          </div>
        </Card>
      </div>

      <AreaChart
        areas={[
          { key: 'humanCount', color: '#10B981', name: 'Human Traffic' },
          { key: 'botCount', color: '#F97316', name: 'Bot Traffic' },
          { key: 'totalCount', color: '#6B7280', name: 'Total Traffic' },
        ]}
        data={data?.dailyBreakdown || []}
        isLoading={isLoading}
        title="Bot vs Human Traffic Over Time"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Traffic Quality</h3>
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Human Traffic</span>
                <span className="font-medium text-green-600">
                  {data?.humanCount?.toLocaleString() || 0}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all"
                  style={{ width: `${100 - (data?.botPercentage || 0)}%` }}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bot Traffic</span>
                <span className="font-medium text-orange-600">
                  {data?.botCount?.toLocaleString() || 0}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-orange-600 transition-all"
                  style={{ width: `${data?.botPercentage || 0}%` }}
                />
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Bot Analysis Insights</h3>
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
                    <span className="font-medium text-foreground">
                      {data.botPercentage.toFixed(1)}%
                    </span>{' '}
                    of your traffic is identified as bots
                    {data.botPercentage < 10
                      ? ' - Very good!'
                      : data.botPercentage < 25
                        ? ' - Normal range'
                        : ' - High bot activity'}
                  </p>
                  <p>
                    •{' '}
                    <span className="font-medium text-green-600">
                      {data.humanCount.toLocaleString()}
                    </span>{' '}
                    genuine human visitors out of{' '}
                    <span className="font-medium text-foreground">
                      {data.total.toLocaleString()}
                    </span>{' '}
                    total visits
                  </p>
                  <p>
                    • Filtering bots gives you more accurate analytics for user behavior and
                    engagement
                  </p>
                  {data.dailyBreakdown && data.dailyBreakdown.length > 0 && (
                    <p>
                      • Bot percentage varies daily, with highest at{' '}
                      <span className="font-medium text-foreground">
                        {Math.max(...data.dailyBreakdown.map((d) => d.botPercentage)).toFixed(1)}%
                      </span>
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BotAnalytics;
