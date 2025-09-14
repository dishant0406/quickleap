'use client';

import React, { useEffect, useState } from 'react';

import { Activity, BarChart3, Target, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getRuleAnalytics } from '@/lib/api';
import type { RuleAnalyticsItem, RuleAnalyticsResponse } from '@/lib/types/rules';

interface RuleAnalyticsProps {
  redirectId: string;
}

const RuleAnalytics: React.FC<RuleAnalyticsProps> = ({ redirectId }) => {
  const [analytics, setAnalytics] = useState<RuleAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getRuleAnalytics(redirectId);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching rule analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [redirectId]);

  const getStatusBadge = (status: string): React.ReactElement => {
    const variants = {
      active: 'default',
      inactive: 'neutral',
      draft: 'neutral',
    } as const;

    return (
      <Badge
        className="capitalize"
        variant={variants[status as keyof typeof variants] || 'neutral'}
      >
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: string): React.ReactElement => {
    const colors = {
      force: 'bg-blue-100 text-blue-800',
      percentage: 'bg-purple-100 text-purple-800',
      ab_experiment: 'bg-green-100 text-green-800',
    } as const;

    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {type === 'ab_experiment' ? 'A/B Test' : type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground">Failed to load analytics</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Rule Analytics</h2>
        <p className="text-muted-foreground">Performance metrics and statistics for your rules</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalRules}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeRules}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalRules > 0
                ? `${Math.round((analytics.activeRules / analytics.totalRules) * 100)}% active`
                : 'No rules'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hits</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalHits.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Hits per Rule</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.totalRules > 0
                ? Math.round(analytics.totalHits / analytics.totalRules).toLocaleString()
                : '0'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rule Performance</CardTitle>
          <CardDescription>Detailed performance metrics for each rule</CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.analytics.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No rules to analyze</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Hits</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.analytics.map((rule: RuleAnalyticsItem) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>{getTypeBadge(rule.type)}</TableCell>
                    <TableCell>{getStatusBadge(rule.status)}</TableCell>
                    <TableCell className="text-right font-mono">
                      {rule.hitCount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${Math.min(parseFloat(rule.percentage), 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono">{rule.percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(rule.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RuleAnalytics;
