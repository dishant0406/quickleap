import React from 'react';

import type { Rule } from '@/lib/types/rules';
import { formatCondition } from '@/utils/ruleFormatters';

interface RuleConditionsProps {
  rule: Rule;
}

export const RuleConditions: React.FC<RuleConditionsProps> = ({ rule }) => {
  if (rule.conditions.length === 0) {
    return <span className="text-mutedSecondayBlack italic text-sm">No conditions</span>;
  }

  if (rule.conditions.length === 1) {
    return (
      <div className="text-sm">
        <span className="font-medium text-primaryBlack">{formatCondition(rule.conditions[0])}</span>
      </div>
    );
  }

  // Format multiple conditions as a natural sentence
  const conditionTexts = rule.conditions.map((condition) => formatCondition(condition));
  const logic = rule.conditionLogic.toLowerCase();

  return (
    <div className="text-sm leading-relaxed">
      <span className="font-medium text-primaryBlack">
        {conditionTexts.map((conditionText, index) => (
          <span key={index}>
            {conditionText}
            {index < conditionTexts.length - 1 && (
              <>
                {conditionTexts.length > 2 && index < conditionTexts.length - 2 && (
                  <span className="text-mutedSecondayBlack">, </span>
                )}
                {(index === conditionTexts.length - 2 || conditionTexts.length === 2) && (
                  <span className="text-mtext font-semibold mx-2 bg-main px-2 py-1 rounded-base border border-border text-xs">
                    {logic.toUpperCase()}
                  </span>
                )}
              </>
            )}
          </span>
        ))}
      </span>
    </div>
  );
};
