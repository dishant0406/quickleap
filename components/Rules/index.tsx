'use client';

import React, { useCallback, useEffect, useState } from 'react';

import {
  ChevronLeft,
  Copy,
  Edit,
  GripVertical,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { arrayMove, List } from '@/components/ui/Movable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  deleteRule,
  duplicateRule,
  getRulesForRedirect,
  reorderRules,
  toggleRuleStatus,
} from '@/lib/api';
import { promiseToast } from '@/lib/toast';
import type { Rule, RuleStatus } from '@/lib/types/rules';

import RuleAnalytics from './RuleAnalytics';
import RuleBuilder from './RuleBuilder';
import RuleTester from './RuleTester';

interface RulesManagerProps {
  redirectId: string;
}

const RulesManager: React.FC<RulesManagerProps> = ({ redirectId }) => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('rules');
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const router = useRouter();
  // Remove unused variables
  // const [reordering, setReordering] = useState(false);
  // const router = useRouter();

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

  const handleCreateRule = (): void => {
    setEditingRule(null);
    setShowRuleBuilder(true);
  };

  const handleEditRule = (rule: Rule): void => {
    setEditingRule(rule);
    setShowRuleBuilder(true);
  };

  const handleDeleteRule = async (ruleId: number): Promise<void> => {
    promiseToast(deleteRule(ruleId.toString()), 'Rule deleted successfully', {
      errorMessage: 'Error deleting rule',
      onSuccess: fetchRules,
    });
  };

  const handleDuplicateRule = async (ruleId: number): Promise<void> => {
    promiseToast(duplicateRule(ruleId.toString()), 'Rule duplicated successfully', {
      errorMessage: 'Error duplicating rule',
      onSuccess: fetchRules,
    });
  };

  const handleToggleStatus = async (ruleId: number, newStatus: RuleStatus): Promise<void> => {
    promiseToast(
      toggleRuleStatus(ruleId.toString(), { status: newStatus }),
      'Rule status updated successfully',
      {
        errorMessage: 'Error updating rule status',
        onSuccess: fetchRules,
      }
    );
  };

  const handleReorderRules = async (oldIndex: number, newIndex: number): Promise<void> => {
    const originalRules = [...rules];
    const newRules = arrayMove(rules, oldIndex, newIndex);
    setRules(newRules);

    // Extract rule IDs in the new order
    const ruleIds = newRules.map((rule) => rule.id);

    promiseToast(reorderRules(redirectId, { ruleIds }), 'Rules reordered successfully', {
      errorMessage: 'Error reordering rules',
      onSuccess: fetchRules,
      final: () => {
        // Revert the optimistic update on error if the promise failed
        // The promiseToast will handle this through its error handling
      },
    }).catch(() => {
      // Revert the optimistic update on error
      setRules(originalRules);
    });
  };

  // Removed unused handleReorderRules function

  const filteredRules = rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: RuleStatus): React.ReactElement => {
    const variants = {
      active: 'default',
      inactive: 'neutral',
      draft: 'neutral',
    } as const;

    return (
      <Badge className="capitalize" variant={variants[status]}>
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

  if (showRuleBuilder) {
    return (
      <RuleBuilder
        redirectId={redirectId}
        rule={editingRule}
        onClose={() => {
          setShowRuleBuilder(false);
          setEditingRule(null);
        }}
        onSave={() => {
          setShowRuleBuilder(false);
          setEditingRule(null);
          fetchRules();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1vw]">
          <Button
            className="h-8 w-8 flex items-center justify-center gap-2 px-2 text-sm"
            onClick={() => router.back()}
          >
            <ChevronLeft />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rules</h1>
            <p className="text-mutedSecondayBlack">
              Create and manage redirect rules for advanced targeting
            </p>
          </div>
        </div>
        <Button className="gap-2" onClick={handleCreateRule}>
          <Plus className="h-4 w-4" />
          Create Rule
        </Button>
      </div>

      <Tabs className="space-y-4" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tester">Rule Tester</TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="rules">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Redirect Rules</CardTitle>
                  <CardDescription className="text-mutedSecondayBlack">
                    Manage rules that control how visitors are redirected based on various
                    conditions
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8 w-64"
                      placeholder="Search rules..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading && filteredRules.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-muted-foreground">Loading rules...</div>
                </div>
              ) : filteredRules.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-4">
                    {rules.length === 0 ? 'No rules created yet' : 'No rules match your search'}
                  </div>
                  {rules.length === 0 && (
                    <Button className="gap-2" variant="neutral" onClick={handleCreateRule}>
                      <Plus className="h-4 w-4" />
                      Create your first rule
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Header row to show column labels */}
                  <div className="flex items-center gap-4 px-4 py-2 border-b  text-sm font-medium text-secondaryBlack">
                    <div className="flex items-center mr-2 gap-3">
                      <div className="w-5 h-5"></div> {/* Space for grip handle */}
                      <div className="w-8 text-center">Priority</div>
                    </div>
                    <div className="flex-1 grid grid-cols-5 gap-4">
                      <div>Name</div>
                      <div>Type</div>
                      <div>Status</div>
                      <div>Conditions</div>
                      <div>Hit Count</div>
                    </div>
                    <div className="w-8">Actions</div>
                  </div>

                  <List<Rule>
                    lockVertically
                    renderItem={({ value: rule, props }) => (
                      <div
                        {...props}
                        key={rule.id}
                        className={` rounded-lg p-4 transition-shadow `}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex mr-2 items-center gap-3">
                            <GripVertical
                              data-movable-handle
                              className="h-5 w-5 text-muted-foreground cursor-grab"
                              style={{ cursor: 'grab' }}
                            />
                            <div className="flex items-center justify-center w-8 h-8  rounded text-sm font-mono">
                              {rule.priority}
                            </div>
                          </div>

                          <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                            <div>
                              <div className="font-medium">{rule.name}</div>
                              {rule.description && rule.name !== rule.description && (
                                <div className="text-xs text-mutedSecondayBlack truncate max-w-64">
                                  {rule.description}
                                </div>
                              )}
                            </div>

                            <div>{getTypeBadge(rule.type)}</div>

                            <div>{getStatusBadge(rule.status)}</div>

                            <div>
                              <div className="text-sm">
                                {rule.conditions.length} condition
                                {rule.conditions.length !== 1 ? 's' : ''}
                                {rule.conditions.length > 0 && (
                                  <span className="text-muted-foreground ml-1">
                                    ({rule.conditionLogic})
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="font-mono text-sm">
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
                                <DropdownMenuItem onClick={() => handleEditRule(rule)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDuplicateRule(rule.id)}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleToggleStatus(
                                      rule.id,
                                      rule.status === 'active' ? 'inactive' : 'active'
                                    )
                                  }
                                >
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
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteRule(rule.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    )}
                    renderList={({ children, props, isDragged }) => (
                      <div
                        {...props}
                        className="space-y-2"
                        style={{ cursor: isDragged ? 'grabbing' : undefined }}
                      >
                        {children}
                      </div>
                    )}
                    values={filteredRules}
                    onChange={({ oldIndex, newIndex }) => handleReorderRules(oldIndex, newIndex)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <RuleAnalytics redirectId={redirectId} />
        </TabsContent>

        <TabsContent value="tester">
          <RuleTester redirectId={redirectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RulesManager;
