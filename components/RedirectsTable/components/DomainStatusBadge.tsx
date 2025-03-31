import React from 'react';

import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface DomainStatusBadgeProps {
  status: DomainStatus | null;
  isLoading?: boolean;
}

export const DomainStatusBadge: React.FC<DomainStatusBadgeProps> = ({ status, isLoading }) => {
  if (isLoading || !status) {
    return (
      <Badge className="flex gap-2 py-2 px-4 w-32 items-center justify-center">
        <Loader2 className="animate-spin" size={16} />
        <span>Checking...</span>
      </Badge>
    );
  }

  if (status.status.success) {
    return (
      <Badge className="flex gap-2 py-2 px-4 w-32 items-center justify-center">
        <CheckCircle2 size={16} />
        <span>Verified</span>
      </Badge>
    );
  }

  return (
    <Badge className="flex gap-2 py-2 px-4 w-32 items-center justify-center" variant={'neutral'}>
      <AlertCircle size={16} />
      <span>Pending</span>
    </Badge>
  );
};
