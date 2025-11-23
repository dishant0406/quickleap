import type { PageConfig } from '@/components/DynamicPage/types';

export const apiIntegrationConfig: PageConfig = {
  title: 'API Integration - QuickLeap',
  description: 'Automate redirection workflows with our advanced API and developer tools.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['API', 'integration', 'automation', 'developer tools', 'QuickLeap'],
    canonicalUrl: 'https://quickleap.io/features/api-integration',
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'API Integration',
      subtitle: 'Automate redirection workflows with our advanced API.',
      height: 'screen',
      backgroundPattern: true,
      badges: ['RESTful API', 'Developer Friendly'],
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
          title: 'Powerful API for Developers',
          subtitle: 'Integrate domain redirects into your applications and workflows',
          children: [
            {
              id: 'api-features-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'feature-1',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Code',
                  title: 'RESTful API',
                  description:
                    'Clean, intuitive REST endpoints that follow industry standards and best practices for seamless integration.',
                },
                {
                  id: 'feature-2',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Shield',
                  title: 'Secure Authentication',
                  description:
                    'Enterprise-grade security with API keys and OAuth 2.0 support, ensuring your data remains protected.',
                },
                {
                  id: 'feature-3',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'Gauge',
                  title: 'Rate Limiting',
                  description:
                    'Fair usage policies with generous limits across all plans, designed to scale with your business needs.',
                },
                {
                  id: 'feature-4',
                  type: 'featureBox',
                  variant: 'big',
                  icon: 'BookOpen',
                  title: 'Comprehensive Docs',
                  description:
                    'Detailed documentation with code examples in multiple programming languages and interactive API explorer.',
                },
              ],
            },
          ],
        },
        {
          id: 'endpoints-section',
          type: 'section',
          title: 'API Endpoints',
          subtitle: 'Everything you need to manage redirects programmatically',
          children: [
            {
              id: 'endpoints-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'md',
              children: [
                {
                  id: 'endpoint-1',
                  type: 'card',
                  title: 'Create Redirects',
                  description: 'POST /api/redirects',
                  shadow: true,
                  children: [
                    {
                      id: 'endpoint-1-detail',
                      type: 'markdown',
                      content:
                        '```json\n{\n  "domain": "example.com",\n  "destination": "https://newsite.com",\n  "type": "301"\n}\n```',
                    },
                  ],
                },
                {
                  id: 'endpoint-2',
                  type: 'card',
                  title: 'List Redirects',
                  description: 'GET /api/redirects',
                  shadow: true,
                  children: [
                    {
                      id: 'endpoint-2-detail',
                      type: 'markdown',
                      content:
                        '```json\n[\n  {\n    "id": "redirect_123",\n    "domain": "example.com",\n    "destination": "https://newsite.com",\n    "type": "301"\n  }\n]\n```',
                    },
                  ],
                },
                {
                  id: 'endpoint-3',
                  type: 'card',
                  title: 'Update Redirects',
                  description: 'PUT /api/redirects/:id',
                  shadow: true,
                  children: [
                    {
                      id: 'endpoint-3-detail',
                      type: 'text',
                      content:
                        'Modify existing redirects including destination URLs and redirect types.',
                    },
                  ],
                },
                {
                  id: 'endpoint-4',
                  type: 'card',
                  title: 'Analytics Data',
                  description: 'GET /api/analytics',
                  shadow: true,
                  children: [
                    {
                      id: 'endpoint-4-detail',
                      type: 'text',
                      content: 'Access detailed analytics and metrics for your redirects.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'code-examples-section',
          type: 'section',
          title: 'Code Examples',
          children: [
            {
              id: 'code-tabs',
              type: 'tabs',
              items: [
                {
                  value: 'javascript',
                  label: 'JavaScript',
                  content: [
                    {
                      id: 'js-example',
                      type: 'markdown',
                      content: `
\`\`\`javascript
// Create a new redirect
const response = await fetch('https://api.quickleap.io/redirects', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    domain: 'oldsite.com',
    destination: 'https://newsite.com',
    type: '301'
  })
});

const redirect = await response.json();
console.log('Redirect created:', redirect);
\`\`\`
                      `,
                    },
                  ],
                },
                {
                  value: 'python',
                  label: 'Python',
                  content: [
                    {
                      id: 'python-example',
                      type: 'markdown',
                      content: `
\`\`\`python
import requests

# Create a new redirect
url = 'https://api.quickleap.io/redirects'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}
data = {
    'domain': 'oldsite.com',
    'destination': 'https://newsite.com',
    'type': '301'
}

response = requests.post(url, headers=headers, json=data)
redirect = response.json()
print('Redirect created:', redirect)
\`\`\`
                      `,
                    },
                  ],
                },
                {
                  value: 'curl',
                  label: 'cURL',
                  content: [
                    {
                      id: 'curl-example',
                      type: 'markdown',
                      content: `
\`\`\`bash
# Create a new redirect
curl -X POST https://api.quickleap.io/redirects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "domain": "oldsite.com",
    "destination": "https://newsite.com",
    "type": "301"
  }'
\`\`\`
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
          title: 'Use Cases',
          children: [
            {
              id: 'use-cases-content',
              type: 'markdown',
              content: `
## Real-World Integration Scenarios

### E-commerce & Product Management
Transform your product lifecycle management by automatically redirecting expired or discontinued product URLs to relevant category pages or similar products. This ensures customers never hit dead ends and maintains your SEO value from historical product pages.

### Content Management Systems
Seamlessly integrate with your existing CMS to handle large-scale URL restructuring projects. Whether you're migrating to a new site structure or rebranding, maintain all your hard-earned SEO rankings while providing users with a smooth experience.

### Marketing Campaign Automation
Dynamically create and manage campaign-specific domains and landing pages. Perfect for agencies managing multiple clients or businesses running seasonal campaigns that need temporary redirect handling with full analytics tracking.

### Enterprise Multi-Tenant Solutions
Build powerful applications that manage redirects for multiple clients through a single API integration. Ideal for SaaS platforms, agencies, or hosting providers who need to offer redirect management as a white-label service.
              `,
            },
          ],
        },
      ],
    },
  ],
};
