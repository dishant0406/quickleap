'use client';
import React, { useEffect, useState } from 'react';

import { ChartArea, ChevronDown, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CreateRedirectModal } from '@/components/Micro/CreateRedirect';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/custom-checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteRedirect, verifyStatus } from '@/lib/api';
import { formatUrl } from '@/lib/helpers';
import { promiseToast } from '@/lib/toast';
import useRedirectStore from '@/lib/zustand';

import { DnsInstructions } from './DnsInstructions';
import { DomainStatusBadge } from './DomainStatusBadge';
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
      {isExpanded && domainStatus && (
        <TableRow className="bg-bg table-row">
          <TableCell className="p-6" colSpan={4}>
            <DnsInstructions isPolling={isPolling} status={domainStatus} />
          </TableCell>
        </TableRow>
      )}
      <CreateRedirectModal isOpen={isOpen} redirect={redirect} setIsOpen={setIsOpen} />
    </>
  );
};
