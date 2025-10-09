'use client';
import React, { useEffect, useState } from 'react';

import { ChartArea, ChevronDown, ExternalLink, Pencil, Settings2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CreateRedirectModal } from '@/components/Micro/CreateRedirect';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/custom-checkbox';
import { Progress } from '@/components/ui/progress';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { deleteRedirect, verifyStatus } from '@/lib/api';
import { formatUrl } from '@/lib/helpers';
import { promiseToast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import useRedirectStore from '@/lib/zustand';

import { DnsInstructions } from './DnsInstructions';
import { DomainStatusBadge } from './DomainStatusBadge';
import { LimitStatusBadge } from './LimitStatusBadge';
import { RedirectDetails } from './RedirectDetails';
import { TableActions } from './TableActions';

import type { TableAction } from './TableActions';

interface RedirectRowProps {
  redirect: Redirect;
  onSelect?: (ids: string[]) => void;
  onRedirectClick?: (redirect: Redirect) => void;
}

export const RedirectRow: React.FC<RedirectRowProps> = ({
  redirect,
  onSelect,
  onRedirectClick,
}) => {
  const [domainStatus, setDomainStatus] = useState<DomainStatus | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPolling, setIsPolling] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { fetchRedirects } = useRedirectStore();
  const router = useRouter();

  const tableActions: TableAction[] = [
    {
      label: 'Edit',
      icon: <Pencil className="h-4 w-4" />,
      onClick: () => setIsOpen(true),
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => {
        promiseToast(deleteRedirect(redirect.id), 'Redirect deleted successfully', {
          errorMessage: 'Error deleting redirect',
          onSuccess: fetchRedirects,
          setLoading: setIsDeleting,
        });
      },
      variant: 'noShadow',
      disabled: isDeleting,
    },
    {
      label: 'View Stats',
      icon: <ChartArea className="h-4 w-4" />,
      onClick: () => {
        router.push(`/app/analytics/${redirect.id}`);
      },
      variant: 'noShadow',
      disabled: isDeleting,
    },
    {
      label: 'Manage Rules',
      icon: <Settings2 className="h-4 w-4" />,
      onClick: () => {
        router.push(`/app/rules/${redirect.id}`);
      },
      variant: 'noShadow',
      disabled: isDeleting,
    },
  ];

  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      const response = await verifyStatus(redirect.fromDomain);
      setDomainStatus(response.data);
      setIsLoading(false);
      return response.data.status.success;
    } catch (error) {
      console.error('Error fetching status:', error);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPolling && !domainStatus?.status.success) {
      interval = setInterval(async () => {
        const success = await fetchStatus();
        if (success) {
          setIsPolling(false);
        }
      }, 5000); // Poll every 5 seconds
    } else if (isPolling && domainStatus?.status.success) {
      interval = setInterval(async () => {
        const success = await fetchStatus();
        if (!success) {
          setIsPolling(false);
        }
      }, 30000); // Poll every 30 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPolling, domainStatus]);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);
  };

  return (
    <>
      <TableRow
        className="group transition-colors hover:bg-muted/50 table-row"
        onClick={() => onRedirectClick?.(redirect)}
      >
        <TableCell className="p-4">
          <Checkbox
            checked={false}
            onCheckedChange={(checked) => onSelect?.(checked ? [redirect.id] : [])}
          />
        </TableCell>
        <TableCell className="p-4">
          <div className="space-y-1.5">
            <Link
              className="font-medium md:text-base text-sm whitespace-nowrap text-foreground"
              href={formatUrl(redirect.fromDomain).formattedUrl}
              target="_blank"
            >
              {redirect.fromDomain}
            </Link>
            <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
              <ExternalLink
                className="cursor-pointer hover:scale-110 transition-transform"
                size={14}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(formatUrl(redirect.toDomain).formattedUrl, '_blank');
                }}
              />
              {redirect.toDomain}
            </div>
          </div>
        </TableCell>
        <TableCell className="p-4">
          {redirect.analyticsUsage ? (
            <div className="flex flex-col items-center gap-1.5 min-w-[140px]">
              <div className="w-full flex items-center justify-center gap-2">
                <span className="text-xs font-bold font-medium text-foreground">
                  {redirect.analyticsUsage.estimatedTotalHits.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-muted-foreground">/</span>
                <span className="text-xs font-bold text-muted-foreground">
                  {redirect.analyticsUsage.planLimit.toLocaleString()}
                </span>
              </div>
              <Progress
                className={cn(
                  'h-2',
                  redirect.analyticsUsage.limitStatus === 'limit_reached'
                    ? '[&>[data-slot=progress-indicator]]:bg-red-500 [&>[data-slot=progress-indicator]]:border-red-600'
                    : redirect.analyticsUsage.limitStatus === 'approaching_limit'
                      ? '[&>[data-slot=progress-indicator]]:bg-yellow-500 [&>[data-slot=progress-indicator]]:border-yellow-600'
                      : '[&>[data-slot=progress-indicator]]:bg-green-500 [&>[data-slot=progress-indicator]]:border-green-600'
                )}
                value={Math.min(redirect.analyticsUsage.usagePercentage, 100)}
              />
              <div className="w-full flex items-center justify-between gap-2">
                <LimitStatusBadge compact limitStatus={redirect.analyticsUsage.limitStatus} />
                <span className="text-[10px] font-medium text-muted-foreground">
                  {redirect.analyticsUsage.usagePercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground text-center">—</div>
          )}
        </TableCell>
        <TableCell className="p-4">
          <div className=" flex justify-end">
            <DomainStatusBadge isLoading={isLoading} status={domainStatus} />
          </div>
        </TableCell>
        <TableCell className="p-4">
          <div className="flex items-center gap-2">
            <TableActions actions={tableActions} />
            <Button
              className="h-8 w-8 flex items-center justify-center gap-2 px-2 text-sm"
              onClick={handleExpandClick}
            >
              <ChevronDown
                className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                size={16}
              />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow className="bg-bg table-row">
          <TableCell colSpan={5}>
            <Tabs defaultValue="dns">
              <TabsList>
                <TabsTrigger value="dns">DNS Setup</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent className="p-4 py-2" value="details">
                <RedirectDetails redirect={redirect} />
              </TabsContent>
              <TabsContent className="p-4 py-2" value="dns">
                {domainStatus ? (
                  <DnsInstructions isPolling={isPolling} status={domainStatus} />
                ) : (
                  <div className="text-sm text-muted-foreground">Loading DNS status...</div>
                )}
              </TabsContent>
            </Tabs>
          </TableCell>
        </TableRow>
      )}
      <CreateRedirectModal isOpen={isOpen} redirect={redirect} setIsOpen={setIsOpen} />
    </>
  );
};
