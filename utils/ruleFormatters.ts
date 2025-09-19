import { ATTRIBUTE_NAMES, DAY_NAMES, OPERATOR_NAMES } from '@/lib/constants/rules';
import type { AttributeKey, OperatorKey, Rule, RuleCondition } from '@/lib/types/rules';

/**
 * Formats an attribute key into a human-readable name
 */
export const formatAttributeName = (attribute: AttributeKey): string => {
  return ATTRIBUTE_NAMES[attribute] || attribute;
};

/**
 * Formats an operator key into a human-readable name
 */
export const formatOperatorName = (operator: OperatorKey): string => {
  return OPERATOR_NAMES[operator] || operator;
};

/**
 * Formats condition values based on the operator and attribute type
 */
export const formatConditionValue = (condition: RuleCondition, operator: OperatorKey): string => {
  if (!condition.value && operator !== 'exists' && operator !== 'not_exists') {
    return '';
  }

  if (operator === 'exists' || operator === 'not_exists') {
    return '';
  }

  if (operator === 'between' && Array.isArray(condition.value) && condition.value.length === 2) {
    return `${condition.value[0]} and ${condition.value[1]}`;
  }

  // Format day of week values
  if (condition.attribute === 'day_of_week') {
    if (Array.isArray(condition.value)) {
      const dayLabels = condition.value.map((day) => DAY_NAMES[Number(day)] || String(day));
      if (dayLabels.length <= 3) {
        return dayLabels.join(', ');
      }
      return `${dayLabels.slice(0, 2).join(', ')} and ${dayLabels.length - 2} more`;
    }
    return DAY_NAMES[Number(condition.value)] || String(condition.value);
  }

  // Format hour of day values
  if (condition.attribute === 'hour_of_day') {
    if (Array.isArray(condition.value)) {
      const hourLabels = condition.value.map((hour) => `${hour}:00`);
      if (hourLabels.length <= 3) {
        return hourLabels.join(', ');
      }
      return `${hourLabels.slice(0, 2).join(', ')} and ${hourLabels.length - 2} more`;
    }
    return `${condition.value}:00`;
  }

  if (Array.isArray(condition.value)) {
    if (condition.value.length <= 3) {
      return condition.value.join(', ');
    }
    return `${condition.value.slice(0, 2).join(', ')} and ${condition.value.length - 2} more`;
  }

  return String(condition.value);
};

/**
 * Formats a single rule condition into a human-readable string
 */
export const formatCondition = (condition: RuleCondition): string => {
  const attribute = formatAttributeName(condition.attribute);
  const operator = formatOperatorName(condition.operator);
  const value = formatConditionValue(condition, condition.operator);

  let conditionText = `${attribute} ${operator}`;

  if (value) {
    conditionText += ` "${value}"`;
  }

  if (condition.param && condition.attribute === 'query_param') {
    conditionText = `Query param "${condition.param}" ${operator}`;
    if (value) {
      conditionText += ` "${value}"`;
    }
  }

  return conditionText;
};

/**
 * Formats a rule type into a human-readable display name
 */
export const formatRuleType = (type: string): string => {
  if (type === 'ab_experiment') return 'A/B Test';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

/**
 * Filters rules based on search term
 */
export const filterRules = (rules: Rule[], searchTerm: string): Rule[] => {
  if (!searchTerm.trim()) return rules;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(lowerSearchTerm) ||
      rule.description?.toLowerCase().includes(lowerSearchTerm)
  );
};
