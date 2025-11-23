import type { PageConfig } from '@/components/DynamicPage/types';

export const customDomainsConfig: PageConfig = {
  title: 'Custom Domains - QuickLeap',
  description: 'Use your own domain for seamless redirection and brand consistency.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['custom domains', 'branding', 'white label', 'DNS', 'QuickLeap'],
    canonicalUrl: 'https://quickleap.io/features/custom-domains',
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Custom Domains',
      subtitle: 'Use your own domain for seamless redirection.',
      height: 'screen',
      backgroundPattern: true,
      badges: ['Your Brand', 'Professional'],
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
          title: 'Your Brand, Your Domain',
          subtitle: 'Maintain brand consistency with custom domain redirects',
          children: [
            {
              id: 'domain-features-grid',
              type: 'grid',
              columns: { xs: 1, md: 2, lg: 3 },
              gap: 'lg',
              children: [
                {
                  id: 'feature-1',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Globe',
                  title: 'Any Domain',
                  description:
                    'Connect any domain you own - primary domains, subdomains, or parked domains.',
                },
                {
                  id: 'feature-2',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Zap',
                  title: 'Instant Setup',
                  description:
                    'Simple DNS configuration gets your custom domain working in minutes.',
                },
                {
                  id: 'feature-3',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Shield',
                  title: 'Free SSL',
                  description:
                    'Automatic SSL certificate provisioning and renewal for all custom domains.',
                },
                {
                  id: 'feature-4',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'BarChart',
                  title: 'Domain Analytics',
                  description: 'Track performance metrics specific to each custom domain.',
                },
                {
                  id: 'feature-5',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Settings',
                  title: 'Full Control',
                  description:
                    'Manage multiple domains with individual redirect rules and configurations.',
                },
                {
                  id: 'feature-6',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Paintbrush',
                  title: 'Brand Consistency',
                  description:
                    'Maintain your brand identity throughout the entire redirect experience.',
                },
              ],
            },
          ],
        },
        {
          id: 'setup-section',
          type: 'section',
          title: 'Easy Domain Setup',
          subtitle: 'Get your custom domain working in 3 simple steps',
          children: [
            {
              id: 'setup-steps-grid',
              type: 'grid',
              columns: { xs: 1, md: 3 },
              gap: 'lg',
              children: [
                {
                  id: 'step-1',
                  type: 'card',
                  title: '1. Add Your Domain',
                  description: 'Enter your custom domain in the dashboard',
                  shadow: true,
                  children: [
                    {
                      id: 'step-1-detail',
                      type: 'text',
                      content:
                        "Simply enter your domain name (e.g., redirect.yourcompany.com) and we'll provide the DNS configuration details.",
                    },
                  ],
                },
                {
                  id: 'step-2',
                  type: 'card',
                  title: '2. Update DNS',
                  description: 'Point your domain to our servers',
                  shadow: true,
                  children: [
                    {
                      id: 'step-2-detail',
                      type: 'text',
                      content:
                        'Add a simple CNAME or A record to your DNS settings. We provide exact instructions for popular DNS providers.',
                    },
                  ],
                },
                {
                  id: 'step-3',
                  type: 'card',
                  title: '3. Start Redirecting',
                  description: 'Your custom domain is ready to use',
                  shadow: true,
                  children: [
                    {
                      id: 'step-3-detail',
                      type: 'text',
                      content:
                        'DNS propagation typically takes 5-15 minutes. SSL certificates are automatically provisioned.',
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
          title: 'Custom Domain Use Cases',
          children: [
            {
              id: 'use-cases-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'use-case-1',
                  type: 'card',
                  title: 'Marketing Campaigns',
                  shadow: true,
                  children: [
                    {
                      id: 'use-case-1-content',
                      type: 'markdown',
                      content: `
**Campaign-Specific Domains**
- **promo.yourcompany.com** → Landing page
- **offer2024.yourcompany.com** → Special offer
- **event.yourcompany.com** → Event registration

**Benefits:**
- Professional appearance in marketing materials
- Better email deliverability
- Consistent branding across all touchpoints
                      `,
                    },
                  ],
                },
                {
                  id: 'use-case-2',
                  type: 'card',
                  title: 'Legacy Domain Management',
                  shadow: true,
                  children: [
                    {
                      id: 'use-case-2-content',
                      type: 'markdown',
                      content: `
**Old Domain Redirects**
- **oldcompany.com** → New company website
- **product-v1.com** → Updated product page
- **legacy.example.com** → Modern replacement

**Benefits:**
- Preserve SEO rankings
- Maintain existing bookmarks
- Seamless user experience
                      `,
                    },
                  ],
                },
                {
                  id: 'use-case-3',
                  type: 'card',
                  title: 'Regional Websites',
                  shadow: true,
                  children: [
                    {
                      id: 'use-case-3-content',
                      type: 'markdown',
                      content: `
**Geographic Redirects**
- **uk.yourcompany.com** → UK-specific content
- **eu.yourcompany.com** → European site
- **asia.yourcompany.com** → Asian market site

**Benefits:**
- Localized user experience
- Regional compliance
- Improved local SEO
                      `,
                    },
                  ],
                },
                {
                  id: 'use-case-4',
                  type: 'card',
                  title: 'Product Shortcuts',
                  shadow: true,
                  children: [
                    {
                      id: 'use-case-4-content',
                      type: 'markdown',
                      content: `
**Easy-to-Remember URLs**
- **download.yourapp.com** → App download page
- **docs.yourservice.com** → Documentation
- **support.yourcompany.com** → Help center

**Benefits:**
- Memorable URLs for customers
- Easy to share and communicate
- Professional appearance
                      `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'dns-providers-section',
          type: 'section',
          title: 'DNS Provider Instructions',
          subtitle: 'Step-by-step guides for popular DNS providers',
          children: [
            {
              id: 'dns-tabs',
              type: 'tabs',
              items: [
                {
                  value: 'cloudflare',
                  label: 'Cloudflare',
                  content: [
                    {
                      id: 'cloudflare-instructions',
                      type: 'markdown',
                      content: `
## Cloudflare DNS Setup

1. **Log in to Cloudflare** and select your domain
2. **Go to DNS tab** in the dashboard
3. **Add a CNAME record:**
   - **Name**: your-subdomain (e.g., redirect)
   - **Target**: custom.quickleap.io
   - **Proxy status**: DNS only (gray cloud)
4. **Save** the record

**Note**: Make sure the proxy status is set to "DNS only" for proper SSL certificate provisioning.
                      `,
                    },
                  ],
                },
                {
                  value: 'namecheap',
                  label: 'Namecheap',
                  content: [
                    {
                      id: 'namecheap-instructions',
                      type: 'markdown',
                      content: `
## Namecheap DNS Setup

1. **Log in to Namecheap** and go to Domain List
2. **Click Manage** next to your domain
3. **Go to Advanced DNS tab**
4. **Add a new CNAME record:**
   - **Host**: your-subdomain (e.g., redirect)
   - **Value**: custom.quickleap.io
   - **TTL**: Automatic
5. **Save** the changes

DNS propagation typically takes 30 minutes to 24 hours.
                      `,
                    },
                  ],
                },
                {
                  value: 'godaddy',
                  label: 'GoDaddy',
                  content: [
                    {
                      id: 'godaddy-instructions',
                      type: 'markdown',
                      content: `
## GoDaddy DNS Setup

1. **Log in to GoDaddy** and go to My Products
2. **Click DNS** next to your domain
3. **Add a CNAME record:**
   - **Name**: your-subdomain (e.g., redirect)
   - **Value**: custom.quickleap.io
   - **TTL**: 1 hour (default)
4. **Save** the record

Changes may take up to 48 hours to propagate globally.
                      `,
                    },
                  ],
                },
                {
                  value: 'route53',
                  label: 'AWS Route 53',
                  content: [
                    {
                      id: 'route53-instructions',
                      type: 'markdown',
                      content: `
## AWS Route 53 Setup

1. **Open Route 53 console** and select your hosted zone
2. **Click Create Record**
3. **Configure the record:**
   - **Record name**: your-subdomain (e.g., redirect)
   - **Record type**: CNAME
   - **Value**: custom.quickleap.io
   - **TTL**: 300 seconds
4. **Create records**

Route 53 changes typically propagate within 60 seconds globally.
                      `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'troubleshooting-section',
          type: 'section',
          title: 'Troubleshooting',
          children: [
            {
              id: 'troubleshooting-content',
              type: 'markdown',
              content: `
## Common Issues and Solutions

### DNS Propagation Delays
DNS changes can take **up to 24 hours** to propagate globally. Use tools like [whatsmydns.net](https://whatsmydns.net) to check propagation status, and try flushing your local DNS cache if you're still seeing the old configuration.

### SSL Certificate Problems
If you're experiencing SSL issues, ensure your domain correctly points to our servers and **disable any proxy services** like Cloudflare's orange cloud. SSL certificates are automatically provisioned within 24 hours of proper DNS configuration.

### Domain Connection Issues
Double-check that your **CNAME record points to custom.quickleap.io** and verify the configuration using command-line tools like dig or nslookup. Make sure you're using the exact subdomain specified in your dashboard.

### Need Additional Support?
Contact our team at **support@quickleap.io** with your domain name, DNS provider, and any error messages. Include a screenshot of your DNS settings for faster resolution.
              `,
            },
          ],
        },
      ],
    },
  ],
};
