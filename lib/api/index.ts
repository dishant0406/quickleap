import type { RedirectType } from '../constants';
import axiosClient from '../helpers/axios/client';

import type { AxiosResponse } from 'axios';

type AddRedirectProps = {
  fromDomain: string;
  toDomain: string;
  redirectType: RedirectType;
  pathForwarding: boolean;
  queryForwarding: boolean;
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
 *
 * @route /add-redirect
 */

export const addRedirect = async (data: AddRedirectProps): Promise<AxiosResponse> => {
  return axiosClient.post('/redirects/add-redirect', data);
};

/**
 * Verifies the status of a given domain by making a POST request to the `/redirects/verify-domain` endpoint.
 *
 * @param domain - The domain to be verified.
 * @returns A promise that resolves to an AxiosResponse containing the verification status.
 */
export const verifyStatus = async (domain: string): Promise<AxiosResponse> => {
  return axiosClient.post(`/redirects/verify-domain`, { domain });
};

type UpdateRedirectProps = {
  id: string;
  toDomain: string;
  redirectType: RedirectType;
  pathForwarding: boolean;
  queryForwarding: boolean;
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
 *
 * @route /update-redirect
 */
export const updateRedirect = async (data: UpdateRedirectProps): Promise<AxiosResponse> => {
  return axiosClient.put(`/redirects/update/${data.id}`, data);
};

/**
 * Retrieves the redirects associated with the authenticated user.
 *
 * @returns A promise that resolves to an AxiosResponse containing the user's redirects.
 *
 * @route /redirects/get-redirects/me
 */
export const getUserRedirects = async (): Promise<AxiosResponse> => {
  return axiosClient.get('/redirects/get-redirects/me');
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
  return axiosClient.delete(`/redirects/delete-redirect/${id}`);
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/basic`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/time`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/geo`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/devices`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/referrers`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/languages`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/query-params`, {
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/hourly`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/paths`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/status-codes`, {
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/comparison`, {
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/hits`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/dashboard`, { params });
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/user-agents`, {
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/device-categories`, {
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
  return axiosClient.get(`/redirects/analytics/redirect/${redirectId}/stats/browser-families`, {
    params,
  });
};
