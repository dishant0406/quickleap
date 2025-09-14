// Rule types based on backend schema
export type RuleType = 'force' | 'percentage' | 'ab_experiment';
export type RuleStatus = 'active' | 'inactive' | 'draft';
export type ConditionLogic = 'AND' | 'OR';

// Operator types
export type OperatorKey =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'in'
  | 'not_in'
  | 'greater_than'
  | 'less_than'
  | 'greater_equal'
  | 'less_equal'
  | 'between'
  | 'exists'
  | 'not_exists'
  | 'regex'
  | 'ip_range';

export type OperatorValueType = 'single' | 'array' | 'range' | 'none';

export interface RuleOperator {
  key: OperatorKey;
  name: string;
  description: string;
  valueType: OperatorValueType;
  symbol: string;
}

// Attribute types
export type AttributeKey =
  | 'country'
  | 'region'
  | 'city'
  | 'device_type'
  | 'device_brand'
  | 'device_model'
  | 'browser_name'
  | 'browser_version'
  | 'os_name'
  | 'os_version'
  | 'referrer'
  | 'referrer_domain'
  | 'hour_of_day'
  | 'day_of_week'
  | 'language'
  | 'url_path'
  | 'query_param'
  | 'user_agent'
  | 'ip_address';

export type AttributeCategoryKey =
  | 'geography'
  | 'device'
  | 'browser'
  | 'system'
  | 'traffic'
  | 'time'
  | 'language'
  | 'url'
  | 'technical';

export interface RuleAttribute {
  key: AttributeKey;
  name: string;
  description: string;
  type: 'string' | 'number';
  operators: OperatorKey[];
  category: AttributeCategoryKey;
  predefinedValues?: Array<string | { value: string | number; label: string }>;
  availableValues?: AttributeValue[];
  hasAnalyticsData?: boolean;
  requiresParam?: boolean;
}

export interface AttributeCategory {
  name: string;
  description: string;
  icon: string;
  attributes: RuleAttribute[];
}

export interface AttributesByCategory {
  [key: string]: AttributeCategory;
}

// Condition types
export interface RuleCondition {
  attribute: AttributeKey;
  operator: OperatorKey;
  value?: string | number | string[] | number[] | [number, number]; // Can be single value, array, or range
  param?: string; // For query_param attribute
}

// Action types
export interface RedirectAction {
  type: 'redirect';
  url: string;
}

export interface PercentageRedirectAction {
  type: 'percentage_redirect';
  url: string;
  percentage: number;
}

export interface ABTestVariant {
  name: string;
  percentage: number;
  url: string;
}

export interface ABTestAction {
  type: 'ab_test';
  variants: ABTestVariant[];
}

export type RuleAction = RedirectAction | PercentageRedirectAction | ABTestAction;

// Rule types
export interface Rule {
  id: number;
  redirectId: number;
  name: string;
  description?: string;
  type: RuleType;
  priority: number;
  status: RuleStatus;
  conditions: RuleCondition[];
  conditionLogic: ConditionLogic;
  action: RuleAction;
  startDate?: string;
  endDate?: string;
  hitCount: number;
  createdBy: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRuleData {
  name: string;
  description?: string;
  type: RuleType;
  conditions: RuleCondition[];
  conditionLogic: ConditionLogic;
  action: RuleAction;
  startDate?: string;
  endDate?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface UpdateRuleData extends Partial<CreateRuleData> {
  priority?: number;
  status?: RuleStatus;
}

// API Response types
export interface RulesResponse {
  rules: Rule[];
}

export interface RuleResponse {
  rule: Rule;
}

export interface CreateRuleResponse {
  message: string;
  rule: Rule;
}

export interface AttributesAndOperatorsResponse {
  attributes: AttributesByCategory;
  operators: RuleOperator[];
}

export interface AttributeValue {
  value: string | number;
  label: string;
  source?: 'predefined' | 'analytics';
  count?: number;
}

export interface AttributeValuesResponse {
  attribute: string;
  values: AttributeValue[];
}

export interface RuleTestRequest {
  userAttributes: UserAttributes;
}

export interface RuleEvaluationResult {
  url?: string;
  ruleId?: number;
  ruleName?: string;
  actionType?: string;
  percentage?: number;
  variant?: string;
  triggered?: boolean;
}

export interface RuleTestResponse {
  result: RuleEvaluationResult | null;
  userAttributes: UserAttributes;
  message: string;
}

export interface RuleAnalyticsItem {
  id: number;
  name: string;
  type: RuleType;
  status: RuleStatus;
  hitCount: number;
  percentage: string;
  createdAt: string;
}

export interface RuleAnalyticsResponse {
  analytics: RuleAnalyticsItem[];
  totalHits: number;
  totalRules: number;
  activeRules: number;
}

export interface ReorderRulesRequest {
  ruleIds: number[];
}

export interface ReorderRulesResponse {
  message: string;
  rules: Rule[];
}

export interface ToggleRuleStatusRequest {
  status: RuleStatus;
}

// Form types for UI
export interface RuleFormData {
  name: string;
  description: string;
  type: RuleType;
  conditions: RuleCondition[];
  conditionLogic: ConditionLogic;
  action: RuleAction;
  startDate?: Date;
  endDate?: Date;
}

// User attributes for testing
export interface UserAttributes {
  country?: string;
  region?: string;
  city?: string;
  device_type?: string;
  device_brand?: string;
  device_model?: string;
  browser_name?: string;
  browser_version?: string;
  os_name?: string;
  os_version?: string;
  referrer?: string;
  referrer_domain?: string;
  hour_of_day?: number;
  day_of_week?: number;
  language?: string;
  url_path?: string;
  query_params?: Record<string, string>;
  user_agent?: string;
  ip_address?: string;
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
}

export interface RuleValidationResponse {
  valid: boolean;
  errors: ValidationError[];
}
