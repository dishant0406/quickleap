import type { PageConfig } from '@/components/DynamicPage/types';

export const analyticsMonitoringConfig: PageConfig = {
  title: 'Analytics & Monitoring - QuickLeap',
  description: 'Monitor traffic patterns and performance metrics with comprehensive analytics.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['analytics', 'monitoring', 'traffic analysis', 'metrics', 'QuickLeap'],
    canonicalUrl: 'https://quickleap.io/features/analytics',
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Analytics & Monitoring',
      subtitle: 'Monitor traffic patterns and performance metrics with ease.',
      height: 'screen',
      backgroundPattern: true,
      badges: ['Real-time Data', 'Detailed Insights'],
    },
    {
      id: 'main-container',
      type: 'container',
      layout: 'contained',
      padding: 'lg',
      children: [
        {
          id: 'overview-section',
          type: 'section',
          title: 'Comprehensive Analytics',
          subtitle: 'Get deep insights into your redirect performance and visitor behavior',
          children: [
            {
              id: 'analytics-features-grid',
              type: 'grid',
              columns: { xs: 1, md: 2, lg: 4 },
              gap: 'lg',
              children: [
                {
                  id: 'feature-1',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'BarChart3',
                  title: 'Traffic Overview',
                  description:
                    'See total visits, unique visitors, and click-through rates at a glance.',
                },
                {
                  id: 'feature-2',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Globe',
                  title: 'Geographic Data',
                  description:
                    'Understand where your visitors are coming from with detailed geographic breakdowns.',
                },
                {
                  id: 'feature-3',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Smartphone',
                  title: 'Device Analytics',
                  description: 'Track desktop vs mobile usage and optimize for your audience.',
                },
                {
                  id: 'feature-4',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Clock',
                  title: 'Real-time Monitoring',
                  description: 'See traffic as it happens with live analytics updates.',
                },
              ],
            },
          ],
        },
        {
          id: 'metrics-section',
          type: 'section',
          title: 'Key Metrics We Track',
          children: [
            {
              id: 'metrics-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'metric-1',
                  type: 'card',
                  title: 'Traffic Metrics',
                  shadow: true,
                  children: [
                    {
                      id: 'metric-1-content',
                      type: 'markdown',
                      content: `
- **Total Clicks**: Complete visitor count
- **Unique Visitors**: Deduplicated user sessions  
- **Click-through Rate**: Engagement percentage
- **Bounce Rate**: Visitor retention metrics
- **Session Duration**: Time spent on redirected pages
                      `,
                    },
                  ],
                },
                {
                  id: 'metric-2',
                  type: 'card',
                  title: 'Performance Metrics',
                  shadow: true,
                  children: [
                    {
                      id: 'metric-2-content',
                      type: 'markdown',
                      content: `
- **Response Time**: Redirect speed analysis
- **Uptime Monitoring**: 99.9% availability tracking
- **Error Rates**: Failed redirect detection
- **Geographic Latency**: Regional performance data
- **Peak Traffic Analysis**: Load pattern insights
                      `,
                    },
                  ],
                },
                {
                  id: 'metric-3',
                  type: 'card',
                  title: 'Visitor Demographics',
                  shadow: true,
                  children: [
                    {
                      id: 'metric-3-content',
                      type: 'markdown',
                      content: `
- **Browser Usage**: Chrome, Firefox, Safari breakdown
- **Operating Systems**: Windows, macOS, mobile OS data
- **Device Types**: Desktop, tablet, mobile distribution
- **Screen Resolutions**: Display size analytics
- **Language Preferences**: Visitor locale data
                      `,
                    },
                  ],
                },
                {
                  id: 'metric-4',
                  type: 'card',
                  title: 'Referral Sources',
                  shadow: true,
                  children: [
                    {
                      id: 'metric-4-content',
                      type: 'markdown',
                      content: `
- **Direct Traffic**: Visitors typing URL directly
- **Search Engines**: Google, Bing, organic traffic
- **Social Media**: Facebook, Twitter, LinkedIn referrals
- **Email Campaigns**: Newsletter and marketing clicks
- **Custom UTM Tracking**: Campaign attribution data
                      `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'dashboard-features-section',
          type: 'section',
          title: 'Dashboard Features',
          subtitle: 'Powerful tools to analyze and optimize your redirects',
          children: [
            {
              id: 'dashboard-grid',
              type: 'grid',
              columns: { xs: 1, lg: 2 },
              gap: 'xl',
              children: [
                {
                  id: 'dashboard-feature-1',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Calendar',
                  title: 'Custom Date Ranges',
                  description:
                    'Analyze data for any time period with flexible date selection and comparison tools.',
                },
                {
                  id: 'dashboard-feature-2',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Filter',
                  title: 'Advanced Filtering',
                  description:
                    'Drill down into specific segments with powerful filtering by country, device, referrer, and more.',
                },
                {
                  id: 'dashboard-feature-3',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Download',
                  title: 'Data Export',
                  description:
                    'Export your analytics data in CSV, JSON, or PDF formats for further analysis.',
                },
                {
                  id: 'dashboard-feature-4',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Bell',
                  title: 'Smart Alerts',
                  description:
                    'Get notified about traffic spikes, downtime, or unusual patterns via email or webhook.',
                },
              ],
            },
          ],
        },
        {
          id: 'privacy-section',
          type: 'section',
          title: 'Privacy-First Analytics',
          children: [
            {
              id: 'privacy-content',
              type: 'markdown',
              content: `
## GDPR Compliant Data Collection

We believe in providing powerful analytics while respecting visitor privacy. Our approach is transparent, secure, and fully compliant with global privacy regulations.

### Anonymous & Aggregated Data Only
We collect **no personal identifiers, IP addresses, or tracking cookies**. All analytics data is anonymous and aggregated, giving you valuable insights without compromising visitor privacy.

### Full Regulatory Compliance
**GDPR, CCPA, and global privacy standards** are built into our core. Data is pseudonymized, never shared with third parties, and visitors maintain full control with easy opt-out options.

### Enterprise Security
Your analytics data is protected with **end-to-end encryption** and stored in SOC 2 compliant data centers. Regular security audits ensure the highest standards of data protection.
              `,
            },
          ],
        },
      ],
    },
  ],
};
