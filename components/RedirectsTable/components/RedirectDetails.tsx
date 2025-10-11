import React from 'react';

import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Lock,
  Repeat,
  TrendingUp,
  XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Tooltip from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface RedirectDetailsProps {
  redirect: Redirect;
}

export const RedirectDetails: React.FC<RedirectDetailsProps> = ({ redirect }) => {
  const getRedirectTypeBadge = (type: string) => {
    const isPermanent = type === 'permanent';
    return (
      <Badge
        className={cn(
          'font-medium',
          isPermanent
            ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-800'
            : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800'
        )}
        variant="default"
      >
        <Repeat className="h-3 w-3 mr-1" />
        {isPermanent ? '301 Permanent' : '302 Temporary'}
      </Badge>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {/* Header with main badges */}
      <div className="flex flex-wrap items-center gap-2">
        {getRedirectTypeBadge(redirect.redirectType)}
        {redirect.isSealed && (
          <Tooltip content={redirect.sealReason || 'Redirect is sealed'}>
            <Badge
              className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800 font-medium"
              variant="default"
            >
              <Lock className="h-3 w-3 mr-1" />
              Sealed
            </Badge>
          </Tooltip>
        )}
      </div>

      <Separator />

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Forwarding Settings */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Forwarding
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              {redirect.pathForwarding ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-sm">Path Forwarding</span>
            </div>
            <div className="flex items-center gap-2">
              {redirect.queryForwarding ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-sm">Query Forwarding</span>
            </div>
          </div>
        </div>

        {/* Analytics Settings */}
        {redirect.analyticsUsage && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Analytics
            </h4>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sampling Rate</span>
                <Badge variant="neutral">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {(redirect.analyticsUsage.samplingRate * 100).toFixed(0)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recorded Hits</span>
                <Badge variant="neutral">
                  {redirect.analyticsUsage.recordedHits.toLocaleString()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Total</span>
                <Badge variant="neutral">
                  {redirect.analyticsUsage.recordedHits.toLocaleString()}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Timestamps
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <Badge className="flex gap-2" variant="neutral">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{formatDate(redirect.createdAt)}</span>
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Updated</span>
              <Badge className="flex gap-2" variant="neutral">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{formatDate(redirect.updatedAt)}</span>
              </Badge>
            </div>
            {redirect.sealedAt && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sealed At</span>
                <Badge className="flex gap-2" variant="neutral">
                  <Lock className="h-3 w-3 text-red-500" />
                  <span className="text-sm">{formatDate(redirect.sealedAt)}</span>
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Seal Reason if exists */}
      {redirect.isSealed && redirect.sealReason && (
        <>
          <Separator />
          <div className="rounded-base border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1">
                  Seal Reason
                </h5>
                <p className="text-sm text-red-800 dark:text-red-400">{redirect.sealReason}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
