import React from 'react';

import { Copy, Edit, GripVertical, Pause, Play, Settings, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RULE_TABLE_MIN_WIDTH } from '@/lib/constants/rules';
import type { Rule, RuleStatus } from '@/lib/types/rules';

import { RuleStatusBadge, RuleTypeBadge } from './RuleBadges';
import { RuleConditions } from './RuleConditions';
import { RuleDestination } from './RuleDestination';

interface RuleRowProps {
  rule: Rule;
  onEdit: (rule: Rule) => void;
  onDuplicate: (ruleId: number) => void;
  onToggleStatus: (ruleId: number, newStatus: RuleStatus) => void;
  onDelete: (ruleId: number) => void;
  [key: string]: any; // Allow additional props
}

export const RuleRow: React.FC<RuleRowProps> = ({
  rule,
  onEdit,
  onDuplicate,
  onToggleStatus,
  onDelete,
  ...props
}) => {
  const handleToggleStatus = (): void => {
    const newStatus = rule.status === 'active' ? 'inactive' : 'active';
    onToggleStatus(rule.id, newStatus);
  };

  return (
    <div
      className="bg-bw border border-border rounded-base p-4 transition-all hover:shadow-shadow"
      style={{ minWidth: RULE_TABLE_MIN_WIDTH }}
      {...props}
    >
      <div className="flex items-center gap-4">
        <div className="flex mr-2 items-center gap-3">
          <GripVertical
            data-movable-handle
            className="h-5 w-5 text-mutedSecondayBlack cursor-grab hover:text-primaryBlack"
            style={{ cursor: 'grab' }}
          />
          <div className="flex items-center justify-center w-8 h-8 bg-main text-mtext rounded-base border border-border text-sm font-semibold">
            {rule.priority}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-8 gap-4 items-center min-w-0">
          <div className="flex flex-col justify-center min-w-0">
            <div className="font-semibold text-primaryBlack truncate">{rule.name}</div>
            {rule.description && rule.name !== rule.description && (
              <div className="text-sm text-mutedSecondayBlack truncate mt-1">
                {rule.description}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <RuleTypeBadge type={rule.type} />
          </div>

          <div className="flex justify-center">
            <RuleStatusBadge status={rule.status} />
          </div>

          <div className="col-span-2 flex items-center min-w-0">
            <RuleConditions rule={rule} />
          </div>

          <div className="col-span-2 flex items-center min-w-0">
            <RuleDestination rule={rule} />
          </div>

          <div className="font-mono text-sm font-semibold text-primaryBlack text-center">
            {rule.hitCount.toLocaleString()}
          </div>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0" size="sm" variant="neutral">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(rule)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(rule.id)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleToggleStatus}>
                {rule.status === 'active' ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete(rule.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
