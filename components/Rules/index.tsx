'use client';

import React, { useState } from 'react';

import { ChevronLeft, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { List } from '@/components/ui/Movable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRules } from '@/lib/hooks/useRules';
import type { Rule } from '@/lib/types/rules';
import { filterRules } from '@/utils/ruleFormatters';

import { RuleRow, RuleTableHeader } from './components';
import RuleAnalytics from './RuleAnalytics';
import RuleBuilderModal from './RuleBuilderModal';
import RuleTester from './RuleTester';

interface RulesManagerProps {
  redirectId: string;
}

const RulesManager: React.FC<RulesManagerProps> = ({ redirectId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('rules');
  const router = useRouter();

  const {
    rules,
    loading,
    fetchRules,
    handleCreateRule,
    handleEditRule,
    handleDeleteRule,
    handleDuplicateRule,
    handleToggleStatus,
    handleReorderRules,
    showRuleBuilder,
    editingRule,
    setShowRuleBuilder,
    setEditingRule,
  } = useRules({ redirectId });

  const filteredRules = filterRules(rules, searchTerm);

  const handleCloseRuleBuilder = (): void => {
    setShowRuleBuilder(false);
    setEditingRule(null);
  };

  const handleSaveRule = (): void => {
    setShowRuleBuilder(false);
    setEditingRule(null);
    fetchRules();
  };

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
                  <div className="overflow-x-auto">
                    <RuleTableHeader />

                    <List<Rule>
                      lockVertically
                      renderItem={({ value: rule, props }) => (
                        <RuleRow
                          {...props}
                          key={rule.id}
                          rule={rule}
                          onDelete={handleDeleteRule}
                          onDuplicate={handleDuplicateRule}
                          onEdit={handleEditRule}
                          onToggleStatus={handleToggleStatus}
                        />
                      )}
                      renderList={({ children, props, isDragged }) => (
                        <div
                          {...props}
                          className="space-y-3"
                          style={{ cursor: isDragged ? 'grabbing' : undefined }}
                        >
                          {children}
                        </div>
                      )}
                      values={filteredRules}
                      onChange={({ oldIndex, newIndex }) => handleReorderRules(oldIndex, newIndex)}
                    />
                  </div>
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

      <RuleBuilderModal
        isOpen={showRuleBuilder}
        redirectId={redirectId}
        rule={editingRule}
        onClose={handleCloseRuleBuilder}
        onSave={handleSaveRule}
      />
    </div>
  );
};

export default RulesManager;
