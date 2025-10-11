import type { RedirectType } from '../constants';
import axiosClient from '../helpers/axios/client';
import type {
  CreateRuleData,
  ReorderRulesRequest,
  RuleTestRequest,
  ToggleRuleStatusRequest,
  UpdateRuleData,
} from '../types/rules';

import type { AxiosResponse } from 'axios';

type AddRedirectProps = {
  fromDomain: string;
  toDomain: string;
  redirectType: RedirectType;
  pathForwarding: boolean;
  queryForwarding: boolean;
  samplingRate: number;
};

/**
 * Adds a new redirect based on the provided properties.
 *
 * @param data - The properties required to create a new redirect.
 * @param data.fromDomain - The domain from which the redirect originates.
 * @param data.toDomain - The domain to which the redirect points.
 * @param data.redirectType - The type of redirect, either 'permanent' or 'temporary'.
 * @param data.pathForwarding - Indicates whether the path should be forwarded.
 * @param data.queryForwarding - Indicates whether the query parameters should be forwarded.
 * @param data.samplingRate - The sampling rate for analytics (0 to 1).
 *
 * @route /add-redirect
 */

export const addRedirect = async (data: AddRedirectProps): Promise<AxiosResponse> => {
  return axiosClient.post('/add-redirect', data);
};

/**
 * Verifies the status of a given domain by making a POST request to the `/verify-domain` endpoint.
 *
 * @param domain - The domain to be verified.
 * @returns A promise that resolves to an AxiosResponse containing the verification status.
 */
export const verifyStatus = async (domain: string): Promise<AxiosResponse> => {
  return axiosClient.post(`/verify-domain`, { domain });
};

type UpdateRedirectProps = {
  id: string;
  toDomain: string;
  redirectType: RedirectType;
  pathForwarding: boolean;
  queryForwarding: boolean;
  samplingRate: number;
};

/**
 * Updates an existing redirect based on the provided properties.
 *
 * @param data - The properties required to update an existing redirect.
 * @param data.id - The ID of the redirect to be updated.
 * @param data.toDomain - The new domain to which the redirect points.
 * @param data.redirectType - The type of redirect, either 'permanent' or 'temporary'.
 * @param data.pathForwarding - Indicates whether the path should be forwarded.
 * @param data.queryForwarding - Indicates whether the query parameters should be forwarded.
 * @param data.samplingRate - The sampling rate for analytics (0 to 1).
 *
 * @route /update-redirect
 */
export const updateRedirect = async (data: UpdateRedirectProps): Promise<AxiosResponse> => {
  return axiosClient.put(`/update/${data.id}`, data);
};

/**
 * Retrieves the redirects associated with the authenticated user.
 *
 * @returns A promise that resolves to an AxiosResponse containing the user's redirects.
 *
 * @route /redirects/get-redirects/me
 */
export const getUserRedirects = async (): Promise<AxiosResponse> => {
  return axiosClient.get('/get-redirects/me');
};

/**
 * Deletes an existing redirect based on the provided ID.
 *
 * @param id - The ID of the redirect to be deleted.
 * @returns A promise that resolves to an AxiosResponse confirming the deletion.
 *
 * @route /delete-redirect/:id
 */
export const deleteRedirect = async (id: string): Promise<AxiosResponse> => {
  return axiosClient.delete(`/delete-redirect/${id}`);
};

/**
 * Fetches basic statistics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing basic statistics.
 */
export const getBasicStats = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/basic`, { params });
};

/**
 * Fetches time-based analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end, interval).
 * @returns A promise that resolves to an AxiosResponse containing time-based analytics.
 */
export const getHitsOverTime = async (
  redirectId: string,
  params?: { start?: string; end?: string; interval?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/time`, { params });
};

/**
 * Fetches geographic data for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end, groupBy).
 * @returns A promise that resolves to an AxiosResponse containing geographic data.
 */
export const getGeographicData = async (
  redirectId: string,
  params?: { start?: string; end?: string; groupBy?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/geo`, { params });
};

/**
 * Fetches device information for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing device information.
 */
export const getDeviceInfo = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/devices`, { params });
};

/**
 * Fetches referrer data for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end, limit).
 * @returns A promise that resolves to an AxiosResponse containing referrer data.
 */
export const getReferrerData = async (
  redirectId: string,
  params?: { start?: string; end?: string; limit?: number }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/referrers`, { params });
};

/**
 * Fetches language data for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing language data.
 */
export const getLanguageData = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/languages`, { params });
};

/**
 * Fetches query parameter analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing query parameter analytics.
 */
export const getQueryParamAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/query-params`, {
    params,
  });
};

/**
 * Fetches hourly traffic patterns for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing hourly traffic patterns.
 */
export const getHourlyTraffic = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/hourly`, { params });
};

/**
 * Fetches path analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing path analytics.
 */
export const getPathAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/paths`, { params });
};

/**
 * Fetches status code distribution for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing status code distribution.
 */
export const getStatusCodeAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/status-codes`, {
    params,
  });
};

/**
 * Fetches period comparison analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing period comparison analytics.
 */
export const getComparisonAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/comparison`, {
    params,
  });
};

/**
 * Fetches raw hit data with pagination and filtering for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (page, limit, country, isBot, statusCode, start, end).
 * @returns A promise that resolves to an AxiosResponse containing raw hit data.
 */
export const getRawHitData = async (
  redirectId: string,
  params?: {
    page?: number;
    limit?: number;
    country?: string;
    isBot?: boolean;
    statusCode?: number;
    start?: string;
    end?: string;
  }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/hits`, { params });
};

/**
 * Fetches a dashboard summary for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing the dashboard summary.
 */
export const getDashboardSummary = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/dashboard`, { params });
};

/**
 * Fetches user agent analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing user agent analytics.
 */
export const getUserAgentAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/user-agents`, {
    params,
  });
};

/**
 * Fetches device category analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing device category analytics.
 */
export const getDeviceCategoryAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/device-categories`, {
    params,
  });
};

/**
 * Fetches browser family analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing browser family analytics.
 */
export const getBrowserFamilyAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/browser-families`, {
    params,
  });
};

/**
 * Fetches destination URL analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end, limit).
 * @returns A promise that resolves to an AxiosResponse containing destination URL analytics.
 */
export const getDestinationUrlAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string; limit?: number }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/destination-urls`, {
    params,
  });
};

/**
 * Fetches peak traffic analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing peak traffic analytics.
 */
export const getPeakTrafficAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/peak-traffic`, {
    params,
  });
};

/**
 * Fetches return visitor analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing return visitor analytics.
 */
export const getReturnVisitorAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/return-visitors`, {
    params,
  });
};

/**
 * Fetches error analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing error analytics.
 */
export const getErrorAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/errors`, {
    params,
  });
};

/**
 * Fetches bot vs human analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing bot analytics.
 */
export const getBotAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/bots`, {
    params,
  });
};

/**
 * Fetches campaign analytics (UTM parameters) for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing campaign analytics.
 */
export const getCampaignAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/campaigns`, {
    params,
  });
};

/**
 * Fetches language analytics for a redirect.
 *
 * @param redirectId - The ID of the redirect.
 * @param params - Optional query parameters (start, end).
 * @returns A promise that resolves to an AxiosResponse containing language analytics.
 */
export const getLanguageAnalytics = async (
  redirectId: string,
  params?: { start?: string; end?: string }
): Promise<AxiosResponse> => {
  return axiosClient.get(`/analytics/redirect/${redirectId}/stats/languages`, {
    params,
  });
};

// ===============================
// RULES API METHODS
// ===============================

/**
 * Get all rules for a redirect
 *
 * @param redirectId - The ID of the redirect
 * @returns A promise that resolves to an AxiosResponse containing the rules
 *
 * @route GET /rules/redirect/:redirectId
 */
export const getRulesForRedirect = async (redirectId: string): Promise<AxiosResponse> => {
  return axiosClient.get(`/rules/redirect/${redirectId}`);
};

/**
 * Get a specific rule by ID
 *
 * @param ruleId - The ID of the rule
 * @returns A promise that resolves to an AxiosResponse containing the rule
 *
 * @route GET /rules/:ruleId
 */
export const getRuleById = async (ruleId: string): Promise<AxiosResponse> => {
  return axiosClient.get(`/rules/${ruleId}`);
};

/**
 * Create a new rule for a redirect
 *
 * @param redirectId - The ID of the redirect
 * @param data - The rule data to create
 * @returns A promise that resolves to an AxiosResponse containing the created rule
 *
 * @route POST /rules/redirect/:redirectId
 */
export const createRule = async (
  redirectId: string,
  data: CreateRuleData
): Promise<AxiosResponse> => {
  return axiosClient.post(`/rules/redirect/${redirectId}`, data);
};

/**
 * Update an existing rule
 *
 * @param ruleId - The ID of the rule to update
 * @param data - The updated rule data
 * @returns A promise that resolves to an AxiosResponse containing the updated rule
 *
 * @route PUT /rules/:ruleId
 */
export const updateRule = async (ruleId: string, data: UpdateRuleData): Promise<AxiosResponse> => {
  return axiosClient.put(`/rules/${ruleId}`, data);
};

/**
 * Delete a rule
 *
 * @param ruleId - The ID of the rule to delete
 * @returns A promise that resolves to an AxiosResponse confirming deletion
 *
 * @route DELETE /rules/:ruleId
 */
export const deleteRule = async (ruleId: string): Promise<AxiosResponse> => {
  return axiosClient.delete(`/rules/${ruleId}`);
};

/**
 * Reorder rules by changing their priorities
 *
 * @param redirectId - The ID of the redirect
 * @param data - Array of rule IDs in desired order
 * @returns A promise that resolves to an AxiosResponse containing reordered rules
 *
 * @route PUT /rules/redirect/:redirectId/reorder
 */
export const reorderRules = async (
  redirectId: string,
  data: ReorderRulesRequest
): Promise<AxiosResponse> => {
  return axiosClient.put(`/rules/redirect/${redirectId}/reorder`, data);
};

/**
 * Toggle rule status (active/inactive/draft)
 *
 * @param ruleId - The ID of the rule
 * @param data - The new status
 * @returns A promise that resolves to an AxiosResponse containing the updated rule
 *
 * @route PUT /rules/:ruleId/status
 */
export const toggleRuleStatus = async (
  ruleId: string,
  data: ToggleRuleStatusRequest
): Promise<AxiosResponse> => {
  return axiosClient.put(`/rules/${ruleId}/status`, data);
};

/**
 * Duplicate a rule
 *
 * @param ruleId - The ID of the rule to duplicate
 * @returns A promise that resolves to an AxiosResponse containing the duplicated rule
 *
 * @route POST /rules/:ruleId/duplicate
 */
export const duplicateRule = async (ruleId: string): Promise<AxiosResponse> => {
  return axiosClient.post(`/rules/${ruleId}/duplicate`);
};

/**
 * Get available attributes and operators for rule creation
 *
 * @param redirectId - Optional redirect ID to enhance attributes with analytics data
 * @returns A promise that resolves to an AxiosResponse containing attributes and operators
 *
 * @route GET /rules/attributes
 */
export const getAttributesAndOperators = async (redirectId?: string): Promise<AxiosResponse> => {
  const url = redirectId ? `/rules/attributes?redirectId=${redirectId}` : '/rules/attributes';
  return axiosClient.get(url);
};

/**
 * Get possible values for an attribute based on analytics data
 *
 * @param redirectId - The ID of the redirect
 * @param attribute - The attribute name
 * @returns A promise that resolves to an AxiosResponse containing attribute values
 *
 * @route GET /rules/redirect/:redirectId/attributes/:attribute/values
 */
export const getAttributeValues = async (
  redirectId: string,
  attribute: string
): Promise<AxiosResponse> => {
  return axiosClient.get(`/rules/redirect/${redirectId}/attributes/${attribute}/values`);
};

/**
 * Test rule evaluation with given user attributes
 *
 * @param redirectId - The ID of the redirect
 * @param data - The user attributes to test against rules
 * @returns A promise that resolves to an AxiosResponse containing test results
 *
 * @route POST /rules/redirect/:redirectId/test
 */
export const testRuleEvaluation = async (
  redirectId: string,
  data: RuleTestRequest
): Promise<AxiosResponse> => {
  return axiosClient.post(`/rules/redirect/${redirectId}/test`, data);
};

/**
 * Get rule analytics and statistics
 *
 * @param redirectId - The ID of the redirect
 * @returns A promise that resolves to an AxiosResponse containing rule analytics
 *
 * @route GET /rules/redirect/:redirectId/analytics
 */
export const getRuleAnalytics = async (redirectId: string): Promise<AxiosResponse> => {
  return axiosClient.get(`/rules/redirect/${redirectId}/analytics`);
};
