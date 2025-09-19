import { useCallback, useEffect, useState } from 'react';

import { arrayMove } from '@/components/ui/Movable';
import {
  deleteRule,
  duplicateRule,
  getRulesForRedirect,
  reorderRules,
  toggleRuleStatus,
} from '@/lib/api';
import { promiseToast } from '@/lib/toast';
import type { Rule, RuleStatus } from '@/lib/types/rules';

interface UseRulesProps {
  redirectId: string;
}

interface UseRulesReturn {
  // State
  rules: Rule[];
  loading: boolean;

  // Actions
  fetchRules: () => Promise<void>;
  handleCreateRule: () => void;
  handleEditRule: (rule: Rule) => void;
  handleDeleteRule: (ruleId: number) => Promise<void>;
  handleDuplicateRule: (ruleId: number) => Promise<void>;
  handleToggleStatus: (ruleId: number, newStatus: RuleStatus) => Promise<void>;
  handleReorderRules: (oldIndex: number, newIndex: number) => Promise<void>;

  // Rule builder modal state
  showRuleBuilder: boolean;
  editingRule: Rule | null;
  setShowRuleBuilder: (show: boolean) => void;
  setEditingRule: (rule: Rule | null) => void;
}

export const useRules = ({ redirectId }: UseRulesProps): UseRulesReturn => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  const fetchRules = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getRulesForRedirect(redirectId);
      setRules(response.data.rules || []);
    } catch (error) {
      console.error('Error fetching rules:', error);
    } finally {
      setLoading(false);
    }
  }, [redirectId]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const handleCreateRule = useCallback((): void => {
    setEditingRule(null);
    setShowRuleBuilder(true);
  }, []);

  const handleEditRule = useCallback((rule: Rule): void => {
    setEditingRule(rule);
    setShowRuleBuilder(true);
  }, []);

  const handleDeleteRule = useCallback(
    async (ruleId: number): Promise<void> => {
      promiseToast(deleteRule(ruleId.toString()), 'Rule deleted successfully', {
        errorMessage: 'Error deleting rule',
        onSuccess: fetchRules,
      });
    },
    [fetchRules]
  );

  const handleDuplicateRule = useCallback(
    async (ruleId: number): Promise<void> => {
      promiseToast(duplicateRule(ruleId.toString()), 'Rule duplicated successfully', {
        errorMessage: 'Error duplicating rule',
        onSuccess: fetchRules,
      });
    },
    [fetchRules]
  );

  const handleToggleStatus = useCallback(
    async (ruleId: number, newStatus: RuleStatus): Promise<void> => {
      promiseToast(
        toggleRuleStatus(ruleId.toString(), { status: newStatus }),
        'Rule status updated successfully',
        {
          errorMessage: 'Error updating rule status',
          onSuccess: fetchRules,
        }
      );
    },
    [fetchRules]
  );

  const handleReorderRules = useCallback(
    async (oldIndex: number, newIndex: number): Promise<void> => {
      const originalRules = [...rules];
      const newRules = arrayMove(rules, oldIndex, newIndex);
      setRules(newRules);

      // Extract rule IDs in the new order
      const ruleIds = newRules.map((rule) => rule.id);

      promiseToast(reorderRules(redirectId, { ruleIds }), 'Rules reordered successfully', {
        errorMessage: 'Error reordering rules',
        onSuccess: fetchRules,
      }).catch(() => {
        // Revert the optimistic update on error
        setRules(originalRules);
      });
    },
    [rules, redirectId, fetchRules]
  );

  return {
    // State
    rules,
    loading,

    // Actions
    fetchRules,
    handleCreateRule,
    handleEditRule,
    handleDeleteRule,
    handleDuplicateRule,
    handleToggleStatus,
    handleReorderRules,

    // Rule builder modal state
    showRuleBuilder,
    editingRule,
    setShowRuleBuilder,
    setEditingRule,
  };
};
