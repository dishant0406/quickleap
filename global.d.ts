type LimitStatus = 'within_limit' | 'approaching_limit' | 'limit_reached';

type AnalyticsUsage = {
  recordedHits: number;
  estimatedTotalHits: number;
  samplingRate: number;
  month: string;
  planLimit: number;
  usagePercentage: number;
  limitStatus: LimitStatus;
  canRecordMore: boolean;
};

type Redirect = {
  id: string;
  fromDomain: string;
  toDomain: string;
  redirectType: RedirectType;
  pathForwarding: boolean;
  queryForwarding: boolean;
  isVerified: boolean;
  userID: string;
  status?: string;
  isSealed?: boolean;
  sealedAt?: string | null;
  sealReason?: string | null;
  samplingRate?: number;
  createdAt?: string;
  updatedAt?: string;
  analyticsUsage?: AnalyticsUsage;
  __v: number;
};

type DnsRecord = {
  type: string;
  addresses: string[];
  isRootDomain: boolean;
  isVerified: boolean;
};

type StatusResponse = {
  success: boolean;
  title: string;
  summary: string;
  domainType?: string;
  currentStatus?: string;
  currentAddresses?: string[];
  detail?: string;
  certificateStatus?: 'existing' | 'pending';
};

type Required = {
  recordType: string;
  value: string;
  action: string;
};

type Instruction = {
  step: number;
  description: string;
};

type DomainStatus = {
  dnsRecords: DnsRecord;
  status: StatusResponse;
  required?: Required;
  instructions?: {
    title: string;
    steps: Instruction[];
  };
  support?: {
    contactEmail: string;
    additionalInfo: string;
  };
};

type RedirectResponse = {
  redirects: Redirect[];
};

type User = {
  id: string;
  email: string;
  username: string;
  profile: UserProfile;
  isEmailVerified: boolean;
  lastLoginAt: string;
  preferences: UserPreferences;
};

type UserProfile = {
  bio: string;
  company: string;
  website: string;
  lastName: string;
  location: string;
  avatarUrl: string;
  firstName: string;
};

type UserPreferences = {
  timezone: string;
  dateFormat: string;
  marketingEmails: boolean;
  emailNotifications: boolean;
};

type PlanLimits = {
  perRedirect: {
    maxAnalyticsEvents: number;
    maxRulesPerRedirect: number;
    analyticsRetentionDays: number;
  };
  maxRedirects: number;
};

type PlanFeatures = {
  apiAccess: boolean;
  whiteLabel: boolean;
  prioritySupport: boolean;
  coldStorageAccess: boolean;
  customIntegrations: boolean;
  customDomainBranding: boolean;
};

type PlanPricing = {
  amount: number;
  currency: string;
  interval: string;
  trialDays: number;
};

type Plan = {
  id: string;
  name: string;
  description: string;
  limits: PlanLimits;
  features: PlanFeatures;
  pricing: PlanPricing;
  tier: number;
};

type Usage = {
  redirectsUsed: number;
  maxRedirects: number;
  canCreateRedirect: boolean;
  isOnTrial: boolean | null;
  trialEndsAt: string | null;
  isInGracePeriod: boolean;
  gracePeriod: string | null;
};

type UserResponse = {
  user: User;
  plan: Plan;
  usage: Usage;
};

type RedirectAPIResponse = {
  _id: string;
  fromDomain: string;
  toDomain: string;
  isVerified: boolean;
};
