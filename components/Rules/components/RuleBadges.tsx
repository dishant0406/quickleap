import React from 'react';

import { Badge } from '@/components/ui/badge';
import { STATUS_BADGE_VARIANTS, TYPE_BADGE_COLORS } from '@/lib/constants/rules';
import type { RuleStatus } from '@/lib/types/rules';
import { formatRuleType } from '@/utils/ruleFormatters';

interface RuleStatusBadgeProps {
  status: RuleStatus;
}

export const RuleStatusBadge: React.FC<RuleStatusBadgeProps> = ({ status }) => {
  return (
    <Badge className="capitalize" variant={STATUS_BADGE_VARIANTS[status]}>
      {status}
    </Badge>
  );
};

interface RuleTypeBadgeProps {
  type: string;
}

export const RuleTypeBadge: React.FC<RuleTypeBadgeProps> = ({ type }) => {
  const colorClass =
    TYPE_BADGE_COLORS[type as keyof typeof TYPE_BADGE_COLORS] || 'bg-gray-100 text-gray-800';

  return <Badge className={colorClass}>{formatRuleType(type)}</Badge>;
};
