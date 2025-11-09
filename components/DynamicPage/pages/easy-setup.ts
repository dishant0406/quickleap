import type { PageConfig } from '@/components/DynamicPage/types';

export const easySetupConfig: PageConfig = {
  title: 'Easy Setup - QuickLeap',
  description: 'Create and manage redirects in minutes through our intuitive dashboard.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['easy setup', 'domain redirects', 'dashboard', 'QuickLeap'],
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Easy Setup',
      subtitle: 'Create and manage redirects in minutes through our intuitive dashboard.',
      height: 'screen',
      backgroundPattern: true,
      badges: ['Quick Setup', 'User Friendly'],
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
          title: 'Simple. Fast. Effective.',
          subtitle: 'Get your domain redirects up and running in just a few clicks',
          children: [
            {
              id: 'features-grid',
              type: 'grid',
              columns: { xs: 1, md: 2, lg: 3 },
              gap: 'lg',
              children: [
                {
                  id: 'feature-1',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'MousePointer',
                  title: 'One-Click Setup',
                  description:
                    'Set up your first redirect in under 30 seconds with our streamlined process.',
                },
                {
                  id: 'feature-2',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Layout',
                  title: 'Intuitive Dashboard',
                  description:
                    'Clean, modern interface that makes managing redirects simple and enjoyable.',
                },
                {
                  id: 'feature-3',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Zap',
                  title: 'Instant Activation',
                  description:
                    'Your redirects go live immediately after configuration - no waiting time.',
                },
              ],
            },
          ],
        },
        {
          id: 'how-it-works-section',
          type: 'section',
          title: 'How It Works',
          subtitle: 'Three simple steps to get started',
          children: [
            {
              id: 'steps-grid',
              type: 'grid',
              columns: { xs: 1, md: 3 },
              gap: 'lg',
              children: [
                {
                  id: 'step-1',
                  type: 'card',
                  title: '1. Add Your Domain',
                  description: 'Enter your domain name in our simple form',
                  shadow: true,
                  children: [
                    {
                      id: 'step-1-detail',
                      type: 'text',
                      content:
                        "Simply paste your domain URL and we'll handle the rest. No technical configuration required.",
                    },
                  ],
                },
                {
                  id: 'step-2',
                  type: 'card',
                  title: '2. Set Destination',
                  description: 'Choose where visitors should be redirected',
                  shadow: true,
                  children: [
                    {
                      id: 'step-2-detail',
                      type: 'text',
                      content:
                        'Point to any URL - your main website, landing page, or specific content.',
                    },
                  ],
                },
                {
                  id: 'step-3',
                  type: 'card',
                  title: '3. Go Live',
                  description: 'Your redirect is active immediately',
                  shadow: true,
                  children: [
                    {
                      id: 'step-3-detail',
                      type: 'text',
                      content: "That's it! Your domain redirect is now live and working globally.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'benefits-section',
          type: 'section',
          title: 'Why Choose Our Easy Setup?',
          children: [
            {
              id: 'benefits-content',
              type: 'markdown',
              content: `
## Zero Technical Expertise Required

Our intuitive dashboard eliminates the complexity of traditional redirect setup. Whether you're a small business owner, marketer, or developer, you can create professional redirects without understanding DNS records, server configurations, or hosting technicalities. The interface guides you through each step with clear explanations and helpful tooltips.

## Real-Time Visual Feedback

Experience complete transparency throughout the setup process with instant status updates and visual confirmations. Watch as your redirects are validated, configured, and deployed in real-time. Our dashboard shows exactly what's happening at each stage, so you're never left wondering if something is working.

## Powerful Bulk Management

Scale your redirect management effortlessly with our advanced bulk operations. Upload CSV files to configure hundreds of redirects simultaneously, or use our bulk editor to modify multiple redirects at once. Perfect for website migrations, rebranding campaigns, or managing large domain portfolios.

## Intelligent Error Prevention

Our smart validation system acts as your safety net, automatically checking domain formats, destination URLs, and potential conflicts before deployment. This proactive approach prevents common setup errors and ensures your redirects work perfectly from day one, saving you time and frustration.

## Flexible Control & Recovery

Maintain complete control over your redirect infrastructure with unlimited editing capabilities. Instantly modify destinations, toggle redirects on/off, or completely remove them with a single click. Our comprehensive revision history lets you track changes and revert to previous configurations whenever needed.
              `,
            },
          ],
        },
      ],
    },
  ],
};
