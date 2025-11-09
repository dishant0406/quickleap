// Import for mapping
import { aboutUsConfig } from './about-us';
import { analyticsMonitoringConfig } from './analytics-monitoring';
import { apiIntegrationConfig } from './api-integration';
import { contactUsConfig } from './contact-us';
import { customDomainsConfig } from './custom-domains';
import { easySetupConfig } from './easy-setup';
import { globalSecurityConfig } from './global-security';
import { privacyPolicyConfig } from './privacy-policy';
import { ruleBasedRedirectsConfig } from './rule-based-redirects';
import { termsOfServiceConfig } from './terms-of-service';

// Feature Pages
export { analyticsMonitoringConfig } from './analytics-monitoring';
export { apiIntegrationConfig } from './api-integration';
export { customDomainsConfig } from './custom-domains';
export { easySetupConfig } from './easy-setup';
export { globalSecurityConfig } from './global-security';
export { ruleBasedRedirectsConfig } from './rule-based-redirects';

// Standard Pages
export { aboutUsConfig } from './about-us';
export { contactUsConfig } from './contact-us';
export { privacyPolicyConfig } from './privacy-policy';
export { termsOfServiceConfig } from './terms-of-service';

// Page mapping for easy access
export const pageConfigs = {
  // Features
  'easy-setup': easySetupConfig,
  'api-integration': apiIntegrationConfig,
  'analytics-monitoring': analyticsMonitoringConfig,
  analytics: analyticsMonitoringConfig, // Alias
  'global-security': globalSecurityConfig,
  security: globalSecurityConfig, // Alias
  'custom-domains': customDomainsConfig,
  domains: customDomainsConfig, // Alias
  'rule-based-redirects': ruleBasedRedirectsConfig,
  rules: ruleBasedRedirectsConfig, // Alias

  // Standard pages
  'privacy-policy': privacyPolicyConfig,
  privacy: privacyPolicyConfig, // Alias
  'terms-of-service': termsOfServiceConfig,
  terms: termsOfServiceConfig, // Alias
  'contact-us': contactUsConfig,
  contact: contactUsConfig, // Alias
  'about-us': aboutUsConfig,
  about: aboutUsConfig, // Alias
};

export type PageConfigKey = keyof typeof pageConfigs;
