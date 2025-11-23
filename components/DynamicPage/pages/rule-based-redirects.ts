import type { PageConfig } from '@/components/DynamicPage/types';

export const ruleBasedRedirectsConfig: PageConfig = {
  title: 'Rule-Based Redirects - QuickLeap',
  description: 'Customize and steer traffic using flexible redirect rules and conditions.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['rule-based redirects', 'conditional redirects', 'traffic steering', 'QuickLeap'],
    canonicalUrl: 'https://quickleap.io/features/rules',
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Rule-Based Redirects',
      subtitle: 'Customize and steer traffic using flexible redirect rules.',
      height: 'screen',
      backgroundPattern: true,
      badges: ['Smart Routing', 'Conditional Logic'],
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
          title: 'Intelligent Traffic Routing',
          subtitle: 'Route visitors to the right destination based on dynamic conditions',
          children: [
            {
              id: 'rules-features-grid',
              type: 'grid',
              columns: { xs: 1, md: 2, lg: 3 },
              gap: 'lg',
              children: [
                {
                  id: 'feature-1',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'MapPin',
                  title: 'Geographic Routing',
                  description:
                    'Direct visitors to region-specific content based on their location.',
                },
                {
                  id: 'feature-2',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Smartphone',
                  title: 'Device Detection',
                  description: 'Route mobile and desktop users to optimized experiences.',
                },
                {
                  id: 'feature-3',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Clock',
                  title: 'Time-Based Rules',
                  description: 'Schedule redirects to activate at specific times or dates.',
                },
                {
                  id: 'feature-4',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Users',
                  title: 'A/B Testing',
                  description: 'Split traffic between destinations for testing and optimization.',
                },
                {
                  id: 'feature-5',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Globe',
                  title: 'Browser Targeting',
                  description: 'Customize redirects based on visitor browser and language.',
                },
                {
                  id: 'feature-6',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Link',
                  title: 'Referrer Rules',
                  description:
                    'Route traffic differently based on the referring website or campaign.',
                },
              ],
            },
          ],
        },
        {
          id: 'rule-types-section',
          type: 'section',
          title: 'Rule Types',
          subtitle: 'Powerful conditions to control your redirect logic',
          children: [
            {
              id: 'rule-types-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'rule-type-1',
                  type: 'card',
                  title: 'Geographic Rules',
                  shadow: true,
                  children: [
                    {
                      id: 'rule-type-1-content',
                      type: 'markdown',
                      content: `
**Location-Based Routing:**
- **Country**: Route by visitor's country
- **Region/State**: Target specific states or provinces  
- **City**: City-level targeting for local businesses
- **Continent**: Broad geographic regions
- **Custom Regions**: Define your own geographic areas

**Example Use Cases:**
- Route EU visitors to GDPR-compliant pages
- Direct US traffic to .com, UK traffic to .co.uk
- Show local phone numbers by region
                      `,
                    },
                  ],
                },
                {
                  id: 'rule-type-2',
                  type: 'card',
                  title: 'Device & Browser Rules',
                  shadow: true,
                  children: [
                    {
                      id: 'rule-type-2-content',
                      type: 'markdown',
                      content: `
**Device Detection:**
- **Device Type**: Desktop, mobile, tablet
- **Operating System**: iOS, Android, Windows, macOS
- **Browser**: Chrome, Safari, Firefox, Edge
- **Screen Size**: Route based on screen resolution
- **Touch Support**: Detect touch-enabled devices

**Example Use Cases:**
- Mobile users → app download page
- Desktop users → full website experience
- iOS users → App Store, Android → Google Play
                      `,
                    },
                  ],
                },
                {
                  id: 'rule-type-3',
                  type: 'card',
                  title: 'Time-Based Rules',
                  shadow: true,
                  children: [
                    {
                      id: 'rule-type-3-content',
                      type: 'markdown',
                      content: `
**Scheduling Options:**
- **Date Ranges**: Activate rules between specific dates
- **Time of Day**: Route differently during business hours
- **Day of Week**: Weekend vs weekday routing
- **Timezone Support**: Rules respect visitor's local time
- **Recurring Schedules**: Weekly, monthly patterns

**Example Use Cases:**
- Holiday promotions with automatic start/end
- Business hours → contact form, after hours → support docs
- Weekend traffic → casual content, weekday → business focus
                      `,
                    },
                  ],
                },
                {
                  id: 'rule-type-4',
                  type: 'card',
                  title: 'Traffic Splitting',
                  shadow: true,
                  children: [
                    {
                      id: 'rule-type-4-content',
                      type: 'markdown',
                      content: `
**A/B Testing & Load Distribution:**
- **Percentage Split**: 50/50, 70/30, or custom ratios
- **Weighted Routing**: Distribute traffic by priority
- **Random Distribution**: Truly random traffic splitting
- **Session Stickiness**: Keep users on same variant
- **Conversion Tracking**: Track performance by destination

**Example Use Cases:**
- Test landing page variations
- Gradually roll out new website versions
- Load balance between multiple servers
                      `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'advanced-rules-section',
          type: 'section',
          title: 'Advanced Rule Conditions',
          children: [
            {
              id: 'advanced-tabs',
              type: 'tabs',
              items: [
                {
                  value: 'referrer',
                  label: 'Referrer Rules',
                  content: [
                    {
                      id: 'referrer-content',
                      type: 'markdown',
                      content: `
## Referrer-Based Routing

Route visitors based on where they came from:

### Social Media Routing
- **Facebook**: fb.com, facebook.com → social landing page
- **Twitter**: twitter.com, t.co → Twitter-optimized content
- **LinkedIn**: linkedin.com → professional content
- **Instagram**: instagram.com → visual-focused page

### Search Engine Routing
- **Google**: google.com, google.* → SEO-optimized landing
- **Bing**: bing.com → Bing-specific content
- **Direct Traffic**: No referrer → default homepage

### Campaign Attribution
- **Email Campaigns**: Specific email domains → personalized content
- **Partner Sites**: Partner domains → co-branded experience
- **Affiliate Links**: Affiliate domains → commission tracking

### UTM Parameter Rules
- **utm_source**: Route by traffic source
- **utm_medium**: Different handling for email vs social
- **utm_campaign**: Campaign-specific destinations
- **Custom Parameters**: Any URL parameter can trigger rules
                      `,
                    },
                  ],
                },
                {
                  value: 'language',
                  label: 'Language & Locale',
                  content: [
                    {
                      id: 'language-content',
                      type: 'markdown',
                      content: `
## Language & Locale Rules

Personalize based on visitor language preferences:

### Browser Language Detection
- **Primary Language**: User's main browser language
- **Accept-Language**: Full language preference list
- **Fallback Logic**: Default to English if language not supported

### Supported Languages
- **Major Languages**: English, Spanish, French, German, etc.
- **Regional Variants**: en-US vs en-GB, es-ES vs es-MX
- **Right-to-Left**: Arabic, Hebrew language support
- **Character Sets**: Unicode and special character handling

### Locale-Specific Routing
- **Currency**: Show prices in local currency
- **Date Formats**: MM/DD/YYYY vs DD/MM/YYYY
- **Number Formats**: Decimal separators and thousands
- **Cultural Preferences**: Color meanings, imagery choices

### Implementation Examples
\`\`\`
Language: Spanish → example.com/es/
Language: French → example.com/fr/
Language: German → example.com/de/
Default: English → example.com/en/
\`\`\`
                      `,
                    },
                  ],
                },
                {
                  value: 'custom',
                  label: 'Custom Conditions',
                  content: [
                    {
                      id: 'custom-content',
                      type: 'markdown',
                      content: `
## Custom Rule Conditions

Build complex logic with multiple conditions:

### Logical Operators
- **AND**: All conditions must be true
- **OR**: Any condition can be true  
- **NOT**: Exclude specific conditions
- **Nested Logic**: Combine operators for complex rules

### URL Pattern Matching
- **Path Rules**: Route based on URL path
- **Query Parameters**: Custom parameter conditions
- **Subdomain Rules**: Different rules per subdomain
- **Wildcard Matching**: Flexible pattern matching

### Custom Headers
- **User-Agent**: Advanced browser/device detection
- **X-Forwarded-For**: Original IP for proxy detection
- **Custom Headers**: Any HTTP header can trigger rules
- **API Integration**: External service condition checks

### Example Complex Rule
\`\`\`
IF (Country = "United States" OR Country = "Canada") 
AND Device = "Mobile" 
AND Time = "Business Hours" 
AND NOT Referrer = "competitor.com"
THEN Redirect to: mobile-na.example.com
\`\`\`

### Rule Priority & Conflicts
- **Priority Levels**: Set rule execution order
- **Conflict Resolution**: Handle overlapping conditions
- **Default Fallback**: Always have a default destination
- **Rule Testing**: Test conditions before going live
                      `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'use-cases-section',
          type: 'section',
          title: 'Real-World Use Cases',
          children: [
            {
              id: 'use-cases-content',
              type: 'markdown',
              content: `
## Global E-commerce Optimization

Transform your international online store by automatically routing visitors to region-appropriate experiences. **European customers get GDPR-compliant checkout flows and Euro pricing**, while **US visitors see USD pricing and faster shipping options**. Mobile users are seamlessly directed to touch-optimized storefronts, and returning customers skip the homepage entirely, landing directly on their personalized account dashboard.

## Intelligent SaaS Product Rollouts

Manage complex product launches with confidence using graduated rollout strategies. **Beta testers from invite campaigns get immediate access to new features**, while **enterprise customers enjoy dedicated high-performance environments**. Implement sophisticated A/B testing by routing 20% of new users to experimental features while maintaining stability for your core user base.

## Campaign-Driven Marketing Automation

Maximize marketing ROI by delivering highly targeted experiences based on traffic source. **Social media visitors land on shareable, visually-rich pages optimized for engagement**, while **email subscribers see personalized content matching their campaign segment**. Paid search traffic gets conversion-optimized landing pages with clear calls-to-action, while organic visitors receive SEO-optimized content that builds trust and authority.

## Time-Sensitive Promotion Management

Automate complex promotional strategies that adapt to real-world schedules and events. **During Black Friday, all traffic flows to special sale pages with countdown timers**, while **business hours route support inquiries to live chat**, and after-hours visitors get comprehensive self-service resources. Weekend traffic enjoys casual, lifestyle-focused content while weekday visitors see business-oriented messaging and case studies.
              `,
            },
          ],
        },
      ],
    },
  ],
};
