import { create } from 'zustand';

import axiosClient from '../helpers/axios/client';

interface PlanPricing {
  amount: number;
  currency: string;
  interval: string;
  trialDays: number;
}

interface PlanLimits {
  perRedirect: {
    maxAnalyticsEvents: number;
    maxRulesPerRedirect: number;
    analyticsRetentionDays: number;
  };
  maxRedirects: number;
}

interface PlanFeatures {
  apiAccess: boolean;
  whiteLabel: boolean;
  prioritySupport: boolean;
  coldStorageAccess: boolean;
  customIntegrations: boolean;
  customDomainBranding: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  pricing: PlanPricing;
  limits: PlanLimits;
  gracePeriodDays: number;
  features: PlanFeatures;
  metadata: Record<string, unknown>;
  isActive: boolean;
  tier: number;
  isCustom: boolean;
  basePlanId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PlansResponse {
  plans: Plan[];
  message: string;
}

const usePlansStore = create<{
  plans: Plan[] | null;
  setPlans: (plans: Plan[] | null) => void;
  fetchAndSetPlan: () => Promise<void>;
}>((set) => ({
  plans: null,
  setPlans: (plans) => set({ plans }),
  fetchAndSetPlan: async () => {
    try {
      const response = await axiosClient.get<PlansResponse>('/user/plans');
      set({ plans: response.data.plans });
    } catch (error) {
      console.error('Error fetching plans:', error);
      set({ plans: null });
    }
  },
}));

export default usePlansStore;
