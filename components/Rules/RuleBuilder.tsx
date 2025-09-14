'use client';

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Calendar, ChevronLeft, Info, LucideHandMetal, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { createRule, getAttributesAndOperators, updateRule } from '@/lib/api';
import { promiseToast } from '@/lib/toast';
import type {
  AttributesByCategory,
  ConditionLogic,
  Rule,
  RuleAction,
  RuleCondition,
  RuleFormData,
  RuleOperator,
  RuleType,
} from '@/lib/types/rules';

import ConditionBuilder from './ConditionBuilder';

interface RuleBuilderProps {
  redirectId: string;
  rule?: Rule | null;
  onClose: () => void;
  onSave: () => void;
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({ redirectId, rule, onClose, onSave }) => {
  const [formData, setFormData] = useState<RuleFormData>({
    name: '',
    description: '',
    type: 'force',
    conditions: [],
    conditionLogic: 'AND',
    action: { type: 'redirect', url: '' },
  });
  const [attributes, setAttributes] = useState<AttributesByCategory>({});
  const [operators, setOperators] = useState<RuleOperator[]>([]);
  const [_loading, _setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [hasSchedule, setHasSchedule] = useState(false);

  useEffect(() => {
    // Load attributes and operators
    const loadMetadata = async (): Promise<void> => {
      try {
        const response = await getAttributesAndOperators(redirectId);
        setAttributes(response.data.attributes);
        setOperators(response.data.operators);
      } catch (error) {
        console.error('Error loading attributes:', error);
      }
    };

    loadMetadata();
  }, [redirectId]);

  useEffect(() => {
    // Populate form if editing existing rule
    if (rule) {
      setFormData({
        name: rule.name,
        description: rule.description || '',
        type: rule.type,
        conditions: rule.conditions,
        conditionLogic: rule.conditionLogic,
        action: rule.action,
        startDate: rule.startDate ? new Date(rule.startDate) : undefined,
        endDate: rule.endDate ? new Date(rule.endDate) : undefined,
      });
      setHasSchedule(Boolean(rule.startDate || rule.endDate));
    }
  }, [rule]);

  const handleSave = async (): Promise<void> => {
    try {
      setSaving(true);

      const payload = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        conditions: formData.conditions,
        conditionLogic: formData.conditionLogic,
        action: formData.action,
        ...(hasSchedule && {
          startDate: formData.startDate?.toISOString(),
          endDate: formData.endDate?.toISOString(),
        }),
      };

      if (rule) {
        await updateRule(rule.id.toString(), payload);
        promiseToast(Promise.resolve(), 'Rule updated successfully', {
          errorMessage: 'Error updating rule',
        });
      } else {
        await createRule(redirectId, payload);
        promiseToast(Promise.resolve(), 'Rule created successfully', {
          errorMessage: 'Error creating rule',
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving rule:', error);
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = (): boolean => {
    const hasName = formData.name.trim() !== '';

    // Check action validity based on type
    let actionValid = false;
    if (formData.action.type === 'redirect') {
      actionValid = !!formData.action.url;
    } else if (formData.action.type === 'percentage_redirect') {
      actionValid = !!(
        formData.action.url &&
        formData.action.percentage > 0 &&
        formData.action.percentage <= 100
      );
    } else if (formData.action.type === 'ab_test') {
      actionValid = formData.action.variants.length > 0;
    }

    return hasName && actionValid;
  };

  const updateConditions = (newConditions: RuleCondition[]): void => {
    setFormData((prev) => ({ ...prev, conditions: newConditions }));
  };

  const updateAction = (newAction: Partial<RuleAction>): void => {
    setFormData((prev) => ({
      ...prev,
      action: { ...prev.action, ...newAction } as RuleAction,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            className="h-8 w-8 flex items-center justify-center gap-2 px-2 text-sm"
            onClick={onClose}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {rule ? 'Edit Rule' : 'Create Rule'}
            </h1>
            <p className="text-mutedSecondayBlack">
              {rule
                ? 'Modify an existing redirect rule'
                : 'Create a new redirect rule with conditions and actions'}
            </p>
          </div>
        </div>
        <Button className="gap-2" disabled={!isFormValid() || saving} onClick={handleSave}>
          <LucideHandMetal className="h-4 w-4" />
          {saving ? 'Saving...' : rule ? 'Update Rule' : 'Create Rule'}
        </Button>
      </div>

      <Tabs className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Set the basic details for your rule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter a descriptive name for this rule"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Optional description of what this rule does"
                  rows={3}
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Rule Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: RuleType) => {
                    setFormData((prev) => ({
                      ...prev,
                      type: value,
                      action:
                        value === 'force'
                          ? { type: 'redirect', url: '' }
                          : value === 'percentage'
                            ? { type: 'percentage_redirect', url: '', percentage: 50 }
                            : { type: 'ab_test', variants: [] },
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="force">Force Redirect</SelectItem>
                    <SelectItem value="percentage">Percentage Rollout</SelectItem>
                    <SelectItem value="ab_experiment">A/B Test</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {formData.type === 'force' && 'Always redirect matching visitors'}
                  {formData.type === 'percentage' && 'Redirect a percentage of matching visitors'}
                  {formData.type === 'ab_experiment' && 'Split matching visitors between variants'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-4" value="conditions">
          <Card>
            <CardHeader>
              <CardTitle>Conditions</CardTitle>
              <CardDescription>
                Define when this rule should be applied based on visitor attributes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConditionBuilder
                attributes={attributes}
                conditionLogic={formData.conditionLogic}
                conditions={formData.conditions}
                operators={operators}
                redirectId={redirectId}
                onConditionsChange={updateConditions}
                onLogicChange={(logic: ConditionLogic) =>
                  setFormData((prev) => ({ ...prev, conditionLogic: logic }))
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-4" value="actions">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Configure what happens when this rule matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.type === 'force' && (
                <div className="space-y-2">
                  <Label htmlFor="redirectUrl">Redirect URL *</Label>
                  <Input
                    id="redirectUrl"
                    placeholder="https://example.com/destination"
                    value={
                      formData.action.type === 'redirect' ||
                      formData.action.type === 'percentage_redirect'
                        ? formData.action.url || ''
                        : ''
                    }
                    onChange={(e) => updateAction({ url: e.target.value })}
                  />
                </div>
              )}

              {formData.type === 'percentage' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="percentageUrl">Redirect URL *</Label>
                    <Input
                      id="percentageUrl"
                      placeholder="https://example.com/destination"
                      value={
                        formData.action.type === 'redirect' ||
                        formData.action.type === 'percentage_redirect'
                          ? formData.action.url || ''
                          : ''
                      }
                      onChange={(e) => updateAction({ url: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="percentage">Percentage (%) *</Label>
                    <Input
                      id="percentage"
                      max="100"
                      min="1"
                      type="number"
                      value={'percentage' in formData.action ? formData.action.percentage : 50}
                      onChange={(e) =>
                        updateAction({
                          percentage: parseInt(e.target.value) || 50,
                        })
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Percentage of matching visitors to redirect
                    </p>
                  </div>
                </div>
              )}

              {formData.type === 'ab_experiment' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>A/B Test Variants *</Label>
                    <Button
                      className="gap-2"
                      size="sm"
                      variant="neutral"
                      onClick={() => {
                        if ('variants' in formData.action) {
                          const newVariants = [
                            ...formData.action.variants,
                            {
                              name: `Variant ${formData.action.variants.length + 1}`,
                              percentage: 0,
                              url: '',
                            },
                          ];
                          updateAction({ variants: newVariants });
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Add Variant
                    </Button>
                  </div>

                  {'variants' in formData.action &&
                    formData.action.variants.map((variant, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Variant {index + 1}</h4>
                          <Button
                            size="sm"
                            variant="neutral"
                            onClick={() => {
                              if ('variants' in formData.action) {
                                const newVariants = formData.action.variants.filter(
                                  (_, i) => i !== index
                                );
                                updateAction({ variants: newVariants });
                              }
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                              placeholder="Variant name"
                              value={variant.name}
                              onChange={(e) => {
                                if ('variants' in formData.action) {
                                  const newVariants = [...formData.action.variants];
                                  newVariants[index] = { ...variant, name: e.target.value };
                                  updateAction({ variants: newVariants });
                                }
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Percentage</Label>
                            <Input
                              max="100"
                              min="0"
                              type="number"
                              value={variant.percentage}
                              onChange={(e) => {
                                if ('variants' in formData.action) {
                                  const newVariants = [...formData.action.variants];
                                  newVariants[index] = {
                                    ...variant,
                                    percentage: parseInt(e.target.value) || 0,
                                  };
                                  updateAction({ variants: newVariants });
                                }
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>URL</Label>
                            <Input
                              placeholder="https://example.com"
                              value={variant.url}
                              onChange={(e) => {
                                if ('variants' in formData.action) {
                                  const newVariants = [...formData.action.variants];
                                  newVariants[index] = { ...variant, url: e.target.value };
                                  updateAction({ variants: newVariants });
                                }
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}

                  {'variants' in formData.action && (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Total percentage:{' '}
                        {formData.action.variants.reduce((sum, v) => sum + v.percentage, 0)}%
                        (should equal 100%)
                      </span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-4" value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Optionally set when this rule should be active</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch checked={hasSchedule} id="hasSchedule" onCheckedChange={setHasSchedule} />
                <Label htmlFor="hasSchedule">Enable scheduled activation</Label>
              </div>

              {hasSchedule && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="w-full justify-start gap-2" variant="neutral">
                          <Calendar className="h-4 w-4" />
                          {formData.startDate
                            ? format(formData.startDate, 'PPP')
                            : 'Select start date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          initialFocus
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="w-full justify-start gap-2" variant="neutral">
                          <Calendar className="h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, 'PPP') : 'Select end date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          initialFocus
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RuleBuilder;
