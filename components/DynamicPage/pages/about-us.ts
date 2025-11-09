import type { PageConfig } from '@/components/DynamicPage/types';

export const aboutUsConfig: PageConfig = {
  title: 'About Us - QuickLeap',
  description: "Learn about QuickLeap's mission to simplify domain redirects and our team's story.",
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['about us', 'company', 'team', 'mission', 'QuickLeap'],
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'About QuickLeap',
      subtitle: 'Simplifying domain redirects for everyone, everywhere.',
      height: 'screen',
      backgroundPattern: true,
      badges: ['Since 2024', 'Global Team'],
    },
    {
      id: 'main-container',
      type: 'container',
      layout: 'contained',
      padding: 'lg',
      children: [
        {
          id: 'mission-section',
          type: 'section',
          title: 'Our Mission',
          subtitle: 'Making domain redirects accessible to everyone',
          children: [
            {
              id: 'mission-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'mission-text',
                  type: 'flex',
                  direction: 'column',
                  gap: 'md',
                  children: [
                    {
                      id: 'mission-description',
                      type: 'markdown',
                      content: `
## Why We Built QuickLeap

Domain redirection shouldn't require complex hosting setups or expensive infrastructure. We built QuickLeap to eliminate these barriers and make professional domain redirection accessible to:

- **Small Businesses**: Who need reliable redirects without technical complexity
- **Marketers**: Running campaigns with multiple domains and landing pages  
- **Developers**: Building applications that require programmatic redirect management
- **Enterprise Teams**: Managing large-scale domain portfolios with advanced rules

## Our Vision

We envision a world where managing domain redirects is as simple as sending an email. No server management, no DNS complexity, no hosting headaches—just straightforward, reliable redirects that work globally.
                                            `,
                    },
                  ],
                },
                {
                  id: 'mission-stats',
                  type: 'card',
                  title: 'QuickLeap by the Numbers',
                  shadow: true,
                  children: [
                    {
                      id: 'stats-content',
                      type: 'markdown',
                      content: `
### Global Reach
- **150+ Edge Locations** worldwide
- **99.99% Uptime** across all regions
- **<50ms Response Time** average globally
- **24/7 Monitoring** and support

### Customer Success
- **10,000+ Active Users** and growing
- **1M+ Redirects** managed daily
- **99% Customer Satisfaction** rating
- **500+ Enterprise Clients** worldwide

### Platform Reliability
- **SOC 2 Type II Certified** security
- **GDPR & CCPA Compliant** data handling
- **ISO 27001** security standards
- **99.9% API Uptime** for developers
                                            `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'story-section',
          type: 'section',
          title: 'Our Story',
          children: [
            {
              id: 'story-content',
              type: 'markdown',
              content: `
## How It All Started

QuickLeap was born from a simple frustration: redirecting a domain shouldn't require a computer science degree.

### The Problem

I was working across various Node.js and Next.js projects when I encountered a recurring challenge. Multiple clients needed to redirect domains for their applications, but every solution required:

- Setting up hosting accounts for each domain
- Configuring web servers and DNS settings
- Managing SSL certificates manually
- Monitoring uptime and performance
- Dealing with different hosting providers and their quirks

What should have been a 10-minute task turned into weeks of technical overhead. As someone who values clean architecture and efficient solutions, this complexity felt fundamentally wrong.

### The Solution

"There has to be a better way," I thought. That evening, the first prototype of QuickLeap was sketched out. The vision was simple:

1. **Paste your domain**
2. **Enter destination URL**  
3. **Done**

No hosting accounts, no server management, no SSL headaches. Just working redirects in minutes, not days.

### Building the Platform

Over the next year, I built QuickLeap from the ground up with three core principles:

#### Simplicity First
Every feature had to pass the usability test—if it wasn't intuitive, it needed refinement. Complex problems deserve simple solutions.

#### Enterprise-Grade Reliability  
Simple doesn't mean basic. I invested heavily in global infrastructure, security, and monitoring to ensure enterprise-level reliability.

#### Developer-Friendly
While keeping the UI simple, I built powerful APIs and automation tools. As a developer myself, I know the importance of good tooling and clear documentation.

## Today

QuickLeap now serves thousands of customers worldwide, from solo entrepreneurs to Fortune 500 companies. We've processed millions of redirects and helped countless businesses navigate domain changes, marketing campaigns, and website migrations.

But we're just getting started. The roadmap includes AI-powered redirect optimization, advanced analytics, and integrations with popular marketing and development tools.

## What Drives Us

Every day, we hear from customers who tell us QuickLeap saved them hours or even days of work. Whether it's a small business owner redirecting their old domain or a marketing team managing complex campaign redirects, knowing we've made their lives easier drives everything we do.

I believe technology should be a tool that empowers people, not a barrier that stops them. QuickLeap embodies this philosophy—taking something complex and making it beautifully simple.
                            `,
            },
          ],
        },
        {
          id: 'team-section',
          type: 'section',
          title: 'Meet Our Team',
          subtitle: 'The people behind QuickLeap',
          children: [
            {
              id: 'team-grid',
              type: 'grid',
              columns: { xs: 1, sm: 1, md: 1 },
              gap: 'lg',
              children: [
                {
                  id: 'team-member-1',
                  type: 'card',
                  title: 'Dishant Sharma',
                  description: 'Founder & Lead Developer',
                  shadow: true,
                  children: [
                    {
                      id: 'dishant-bio',
                      type: 'text',
                      content:
                        'Full-stack developer and builder with expertise in Node.js, Next.js, and Express. Building ERP systems for emissions tracking. Passionate about building self-hostable, developer-friendly tools that solve real problems, building QuickLeap to simplify domain redirects for everyone.',
                      size: 'sm',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'values-section',
          type: 'section',
          title: 'Our Values',
          children: [
            {
              id: 'values-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'value-1',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Heart',
                  title: 'Product Mindset',
                  description:
                    'We think beyond just the tech stack—considering user experience, product positioning, and long-term scalability in every decision.',
                },
                {
                  id: 'value-2',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Zap',
                  title: 'Clarity Over Complexity',
                  description:
                    'Complex problems deserve simple solutions. We believe the best technology is both powerful and intuitive to use.',
                },
                {
                  id: 'value-3',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Shield',
                  title: 'Reliability',
                  description:
                    'When your business depends on redirects working, they must always work. We build for 99.99% uptime with robust monitoring.',
                },
                {
                  id: 'value-4',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Users',
                  title: 'Developer-First',
                  description:
                    'Self-hostable, modular, and developer-friendly. We build tools we ourselves would want to use and maintain.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
