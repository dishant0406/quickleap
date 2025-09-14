'use client';

import type { JSX } from 'react';
import React, { useState } from 'react';

import { Plus, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAttributeValues } from '@/lib/api';
import type {
  AttributeKey,
  AttributesByCategory,
  AttributeValue,
  ConditionLogic,
  OperatorKey,
  RuleCondition,
  RuleOperator,
} from '@/lib/types/rules';

import { Textarea } from '../ui/textarea';

interface ConditionBuilderProps {
  conditions: RuleCondition[];
  conditionLogic: ConditionLogic;
  attributes: AttributesByCategory;
  operators: RuleOperator[];
  redirectId: string;
  onConditionsChange: (conditions: RuleCondition[]) => void;
  onLogicChange: (logic: ConditionLogic) => void;
}

const ConditionBuilder: React.FC<ConditionBuilderProps> = ({
  conditions,
  conditionLogic,
  attributes,
  operators,
  redirectId,
  onConditionsChange,
  onLogicChange,
}) => {
  const [attributeValues, setAttributeValues] = useState<Record<string, AttributeValue[]>>({});

  const addCondition = (): void => {
    const newCondition: RuleCondition = {
      attribute: 'country',
      operator: 'equals',
      value: '',
    };
    onConditionsChange([...conditions, newCondition]);
  };

  const removeCondition = (index: number): void => {
    const newConditions = conditions.filter((_, i) => i !== index);
    onConditionsChange(newConditions);
  };

  const updateCondition = (index: number, updates: Partial<RuleCondition>): void => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], ...updates };
    onConditionsChange(newConditions);
  };

  const loadAttributeValues = async (attribute: AttributeKey): Promise<void> => {
    if (attributeValues[attribute]) return; // Already loaded

    // Check if we already have enhanced availableValues for this attribute
    const attributeConfig = Object.values(attributes)
      .flatMap((category) => category.attributes)
      .find((attr) => attr.key === attribute);

    if (attributeConfig?.availableValues) {
      // We already have enhanced data, no need to make separate API call
      return;
    }

    try {
      const response = await getAttributeValues(redirectId, attribute);
      setAttributeValues((prev) => ({
        ...prev,
        [attribute]: response.data.values,
      }));
    } catch (error) {
      console.error('Error loading attribute values:', error);
    }
  };

  const getAvailableOperators = (attributeKey: AttributeKey): RuleOperator[] => {
    const attributeConfig = Object.values(attributes)
      .flatMap((category) => category.attributes)
      .find((attr) => attr.key === attributeKey);

    if (!attributeConfig) return [];

    return operators.filter((op) => attributeConfig.operators.includes(op.key));
  };

  const getPredefinedValues = (
    attributeKey: AttributeKey
  ): Array<{ value: string | number; label: string; source?: string; count?: number }> => {
    const attributeConfig = Object.values(attributes)
      .flatMap((category) => category.attributes)
      .find((attr) => attr.key === attributeKey);

    // Use enhanced availableValues if available (includes analytics data)
    if (attributeConfig?.availableValues) {
      return attributeConfig.availableValues;
    }

    // Fall back to predefinedValues
    if (!attributeConfig?.predefinedValues) return [];

    return attributeConfig.predefinedValues.map((val) =>
      typeof val === 'object' ? val : { value: val, label: val }
    );
  };

  const deduplicateValues = (
    values: Array<{ value: string | number; label: string; source?: string; count?: number }>
  ): Array<{ value: string | number; label: string; source?: string; count?: number }> => {
    const seen = new Map<
      string,
      { value: string | number; label: string; source?: string; count?: number }
    >();

    for (const val of values) {
      const key = `${val.value}`;
      const existing = seen.get(key);

      if (!existing) {
        seen.set(key, val);
      } else {
        // If we have an analytics value and the existing is predefined, prefer analytics
        if (val.source === 'analytics' && existing.source !== 'analytics') {
          seen.set(key, val);
        }
        // If both are analytics, keep the one with higher count
        else if (val.source === 'analytics' && existing.source === 'analytics') {
          if ((val.count || 0) > (existing.count || 0)) {
            seen.set(key, val);
          }
        }
      }
    }

    return Array.from(seen.values());
  };

  const renderValueInput = (condition: RuleCondition, index: number): JSX.Element => {
    const operator = operators.find((op) => op.key === condition.operator);
    const predefinedValues = getPredefinedValues(condition.attribute);

    // Check if we already have enhanced availableValues (includes both predefined and analytics)
    const attributeConfig = Object.values(attributes)
      .flatMap((category) => category.attributes)
      .find((attr) => attr.key === condition.attribute);

    // Only use separate analyticsValues if availableValues is not available
    const analyticsValues = attributeConfig?.availableValues
      ? []
      : attributeValues[condition.attribute] || [];

    const allValues = deduplicateValues([...predefinedValues, ...analyticsValues]).sort((a, b) => {
      // Sort analytics values first, then predefined
      if (a.source === 'analytics' && b.source !== 'analytics') return -1;
      if (b.source === 'analytics' && a.source !== 'analytics') return 1;
      // Within analytics, sort by count (descending)
      if (a.source === 'analytics' && b.source === 'analytics') {
        return (b.count || 0) - (a.count || 0);
      }
      // For predefined values, sort alphabetically
      return a.label.localeCompare(b.label);
    });

    if (!operator || operator.valueType === 'none') {
      return <div className="text-sm text-muted-foreground">No value required</div>;
    }

    if (operator.valueType === 'array') {
      const currentValues = Array.isArray(condition.value) ? condition.value : [];

      return (
        <div className="space-y-2">
          <Label>Values (one per line)</Label>
          <Textarea
            placeholder="Enter values, one per line"
            rows={3}
            value={currentValues.join('\n')}
            onChange={(e) => {
              const values = e.target.value.split('\n').filter((v) => v.trim());
              updateCondition(index, { value: values });
            }}
          />
          {allValues.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs">Suggested values:</Label>
              <div className="flex flex-wrap gap-1">
                {allValues.slice(0, 10).map((val, i) => (
                  <Badge
                    key={i}
                    className="cursor-pointer text-xs"
                    variant={val.source === 'analytics' ? 'default' : 'neutral'}
                    onClick={() => {
                      const newValues = [...currentValues, val.value.toString()];
                      updateCondition(index, { value: newValues as string[] });
                    }}
                  >
                    {val.label}
                    {val.count && ` (${val.count})`}
                    {val.source === 'analytics' && (
                      <span className="ml-1 text-[10px] opacity-70">📊</span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (operator.valueType === 'range') {
      const currentValues =
        Array.isArray(condition.value) && condition.value.length === 2 ? condition.value : [0, 100];

      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label>From</Label>
            <Input
              type="number"
              value={currentValues[0]}
              onChange={(e) => {
                const newValues = [parseInt(e.target.value) || 0, currentValues[1]];
                updateCondition(index, { value: newValues as [number, number] });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>To</Label>
            <Input
              type="number"
              value={currentValues[1]}
              onChange={(e) => {
                const newValues = [currentValues[0], parseInt(e.target.value) || 0];
                updateCondition(index, { value: newValues as [number, number] });
              }}
            />
          </div>
        </div>
      );
    }

    // Single value input
    return (
      <div className="space-y-2">
        <Label>Value</Label>
        {allValues.length > 0 ? (
          <Select
            value={condition.value?.toString() || ''}
            onValueChange={(value) => updateCondition(index, { value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select or type a value" />
            </SelectTrigger>
            <SelectContent>
              {allValues.map((val, i) => (
                <SelectItem key={i} value={val.value.toString()}>
                  <div className="flex items-center justify-between w-full">
                    <span>{val.label}</span>
                    <div className="flex items-center gap-1 text-xs opacity-70">
                      {val.count && <span>({val.count})</span>}
                      {val.source === 'analytics' && <span>📊</span>}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            placeholder="Enter value"
            value={condition.value?.toString() || ''}
            onChange={(e) => updateCondition(index, { value: e.target.value })}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Rule Conditions</h3>
          <p className="text-sm text-muted-foreground">
            Define when this rule should be triggered based on visitor attributes
          </p>
        </div>
        <Button className="gap-2" size="sm" variant="neutral" onClick={addCondition}>
          <Plus className="h-4 w-4" />
          Add Condition
        </Button>
      </div>

      {conditions.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <div className="text-muted-foreground mb-4">
            No conditions set - this rule will apply to all visitors
          </div>
          <Button className="gap-2" variant="neutral" onClick={addCondition}>
            <Plus className="h-4 w-4" />
            Add First Condition
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {conditions.length > 1 && (
            <div className="flex items-center gap-2">
              <Label>Logic:</Label>
              <Select
                value={conditionLogic}
                onValueChange={(value: ConditionLogic) => onLogicChange(value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">AND</SelectItem>
                  <SelectItem value="OR">OR</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {conditionLogic === 'AND'
                  ? 'All conditions must be true'
                  : 'Any condition can be true'}
              </span>
            </div>
          )}

          {conditions.map((condition, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Condition {index + 1}</h4>
                  <Button size="sm" variant="neutral" onClick={() => removeCondition(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Attribute</Label>
                    <Select
                      value={condition.attribute}
                      onValueChange={(value: AttributeKey) => {
                        updateCondition(index, {
                          attribute: value,
                          operator: 'equals',
                          value: '',
                        });
                        loadAttributeValues(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(attributes).map(([categoryKey, category]) => (
                          <div key={categoryKey}>
                            <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                              {category.icon} {category.name}
                            </div>
                            {category.attributes.map((attr) => (
                              <SelectItem key={attr.key} value={attr.key}>
                                {attr.name}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Operator</Label>
                    <Select
                      value={condition.operator}
                      onValueChange={(value: OperatorKey) => {
                        updateCondition(index, { operator: value, value: '' });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableOperators(condition.attribute).map((op) => (
                          <SelectItem key={op.key} value={op.key}>
                            {op.name} ({op.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">{renderValueInput(condition, index)}</div>
                </div>

                {condition.attribute === 'query_param' && (
                  <div className="space-y-2">
                    <Label>Query Parameter Name</Label>
                    <Input
                      placeholder="utm_source"
                      value={condition.param || ''}
                      onChange={(e) => updateCondition(index, { param: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConditionBuilder;
