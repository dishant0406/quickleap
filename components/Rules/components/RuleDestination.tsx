import React from 'react';

import { MAX_DISPLAYED_VARIANTS } from '@/lib/constants/rules';
import type { Rule } from '@/lib/types/rules';

interface RuleDestinationProps {
  rule: Rule;
}

export const RuleDestination: React.FC<RuleDestinationProps> = ({ rule }) => {
  const action = rule.action;

  if (action.type === 'redirect') {
    // Force rule - simple URL
    return (
      <div className="space-y-1 min-w-0">
        <div className="text-mutedSecondayBlack text-xs uppercase tracking-wide font-medium">
          Redirects to
        </div>
        <div
          className="bg-bw border border-border rounded-base px-2 py-1 text-sm font-mono text-primaryBlack truncate min-w-0"
          title={action.url}
        >
          {action.url}
        </div>
      </div>
    );
  }

  if (action.type === 'percentage_redirect') {
    // Rollout rule - URL with percentage
    return (
      <div className="space-y-1 min-w-0">
        <div className="text-mutedSecondayBlack text-xs uppercase tracking-wide font-medium">
          <span className="bg-main text-mtext px-2 py-0.5 rounded-base border border-border font-semibold">
            {action.percentage}%
          </span>{' '}
          traffic to
        </div>
        <div
          className="bg-bw border border-border rounded-base px-2 py-1 text-sm font-mono text-primaryBlack truncate min-w-0"
          title={action.url}
        >
          {action.url}
        </div>
      </div>
    );
  }

  if (action.type === 'ab_test') {
    // A/B experiment - multiple variants
    return (
      <div className="space-y-2 min-w-0">
        <div className="text-mutedSecondayBlack text-xs uppercase tracking-wide font-medium">
          <span className="bg-main text-mtext px-2 py-0.5 rounded-base border border-border font-semibold">
            {action.variants.length}
          </span>{' '}
          variants
        </div>
        <div className="space-y-1">
          {action.variants.slice(0, MAX_DISPLAYED_VARIANTS).map((variant, index) => (
            <div
              key={index}
              className="bg-bw border border-border rounded-base px-2 py-1 flex items-center gap-2 min-w-0"
            >
              <span className="bg-main text-mtext px-1.5 py-0.5 rounded text-xs font-semibold min-w-[2.5rem] text-center flex-shrink-0">
                {variant.percentage}%
              </span>
              <span
                className="font-mono text-sm text-primaryBlack truncate min-w-0"
                title={variant.url}
              >
                {variant.url}
              </span>
            </div>
          ))}
          {action.variants.length > MAX_DISPLAYED_VARIANTS && (
            <div className="text-mutedSecondayBlack text-xs text-center py-1">
              +{action.variants.length - MAX_DISPLAYED_VARIANTS} more variants
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div className="text-sm text-mutedSecondayBlack italic">No destination configured</div>;
};
