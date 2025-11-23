import type { PageConfig } from '@/components/DynamicPage/types';

export const globalSecurityConfig: PageConfig = {
  title: 'Global Security - QuickLeap',
  description: 'Rely on our secure, globally distributed network for fast and secure redirection.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['security', 'global network', 'CDN', 'SSL', 'QuickLeap'],
    canonicalUrl: 'https://quickleap.io/features/security',
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Global Security',
      subtitle: 'Rely on our secure, globally distributed network for fast redirection.',
      height: 'screen',
      backgroundPattern: true,
      badges: ['Enterprise Security', 'Global CDN'],
    },
    {
      id: 'main-container',
      type: 'container',
      layout: 'contained',
      padding: 'lg',
      children: [
        {
          id: 'security-overview-section',
          type: 'section',
          title: 'Enterprise-Grade Security',
          subtitle: 'Your redirects are protected by industry-leading security measures',
          children: [
            {
              id: 'security-features-grid',
              type: 'grid',
              columns: { xs: 1, md: 2, lg: 3 },
              gap: 'lg',
              children: [
                {
                  id: 'feature-1',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Shield',
                  title: 'SSL/TLS Encryption',
                  description: 'All redirects use HTTPS with automatic SSL certificate management.',
                },
                {
                  id: 'feature-2',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Lock',
                  title: 'DDoS Protection',
                  description: 'Advanced protection against distributed denial-of-service attacks.',
                },
                {
                  id: 'feature-3',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Eye',
                  title: 'Malware Scanning',
                  description: 'Continuous monitoring for malicious content and threats.',
                },
                {
                  id: 'feature-4',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Globe',
                  title: 'Global CDN',
                  description:
                    'Fast, secure delivery through our worldwide content delivery network.',
                },
                {
                  id: 'feature-5',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Database',
                  title: 'Data Encryption',
                  description: 'All data is encrypted at rest and in transit using AES-256.',
                },
                {
                  id: 'feature-6',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'UserCheck',
                  title: 'Access Control',
                  description: 'Role-based access control and multi-factor authentication.',
                },
              ],
            },
          ],
        },
        {
          id: 'global-network-section',
          type: 'section',
          title: 'Global Network Infrastructure',
          subtitle: 'Distributed across 6 continents for optimal performance',
          children: [
            {
              id: 'network-stats-grid',
              type: 'grid',
              columns: { xs: 2, md: 4 },
              gap: 'md',
              children: [
                {
                  id: 'stat-1',
                  type: 'card',
                  title: '150+',
                  description: 'Edge Locations',
                  shadow: true,
                  children: [
                    {
                      id: 'stat-1-detail',
                      type: 'text',
                      content: 'Distributed globally for minimal latency',
                      size: 'sm',
                      color: 'muted',
                    },
                  ],
                },
                {
                  id: 'stat-2',
                  type: 'card',
                  title: '99.99%',
                  description: 'Uptime SLA',
                  shadow: true,
                  children: [
                    {
                      id: 'stat-2-detail',
                      type: 'text',
                      content: 'Enterprise-grade reliability',
                      size: 'sm',
                      color: 'muted',
                    },
                  ],
                },
                {
                  id: 'stat-3',
                  type: 'card',
                  title: '<50ms',
                  description: 'Average Response',
                  shadow: true,
                  children: [
                    {
                      id: 'stat-3-detail',
                      type: 'text',
                      content: 'Lightning-fast redirects',
                      size: 'sm',
                      color: 'muted',
                    },
                  ],
                },
                {
                  id: 'stat-4',
                  type: 'card',
                  title: '24/7',
                  description: 'Monitoring',
                  shadow: true,
                  children: [
                    {
                      id: 'stat-4-detail',
                      type: 'text',
                      content: 'Continuous network monitoring',
                      size: 'sm',
                      color: 'muted',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'compliance-section',
          type: 'section',
          title: 'Security Compliance',
          children: [
            {
              id: 'compliance-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'compliance-1',
                  type: 'card',
                  title: 'SOC 2 Type II',
                  description: 'Certified security controls',
                  shadow: true,
                  children: [
                    {
                      id: 'compliance-1-content',
                      type: 'markdown',
                      content: `
**Security Controls Audited:**
- Access controls and user management
- Data encryption and protection
- Network security and monitoring
- Incident response procedures
- Business continuity planning
                      `,
                    },
                  ],
                },
                {
                  id: 'compliance-2',
                  type: 'card',
                  title: 'GDPR Compliance',
                  description: 'European data protection standards',
                  shadow: true,
                  children: [
                    {
                      id: 'compliance-2-content',
                      type: 'markdown',
                      content: `
**Privacy Protection Measures:**
- Minimal data collection
- User consent management
- Right to data deletion
- Data portability support
- Privacy by design principles
                      `,
                    },
                  ],
                },
                {
                  id: 'compliance-3',
                  type: 'card',
                  title: 'ISO 27001',
                  description: 'Information security management',
                  shadow: true,
                  children: [
                    {
                      id: 'compliance-3-content',
                      type: 'markdown',
                      content: `
**Security Management:**
- Risk assessment procedures
- Security incident management
- Access control policies
- Supplier security requirements
- Continuous improvement process
                      `,
                    },
                  ],
                },
                {
                  id: 'compliance-4',
                  type: 'card',
                  title: 'PCI DSS',
                  description: 'Payment card industry standards',
                  shadow: true,
                  children: [
                    {
                      id: 'compliance-4-content',
                      type: 'markdown',
                      content: `
**Payment Security:**
- Secure payment processing
- Network segmentation
- Regular security testing
- Vulnerability management
- Strong access control measures
                      `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'security-measures-section',
          type: 'section',
          title: 'Advanced Security Measures',
          children: [
            {
              id: 'security-content',
              type: 'markdown',
              content: `
## Comprehensive Multi-Layer Defense

### Network-Level Protection
Our **Web Application Firewall (WAF) and DDoS mitigation systems** work together to create an impenetrable first line of defense. Advanced threat intelligence automatically blocks malicious IP addresses and bot networks before they can reach your redirects, while intelligent rate limiting ensures fair resource usage and prevents abuse.

### Application Security Framework
Every piece of code follows strict security protocols with **comprehensive input validation, SQL injection prevention, and XSS protection**. Our zero-trust architecture includes CSRF token validation and content security policies that protect against the most sophisticated attack vectors commonly targeting web applications.

### Infrastructure Hardening
Our containerized infrastructure undergoes **continuous vulnerability scanning and regular penetration testing** by certified security experts. Secrets are managed through encrypted storage with automatic rotation, while network microsegmentation ensures complete isolation between customer environments and system components.

### Real-Time Security Operations
A dedicated **24/7 Security Operations Center (SOC)** monitors all systems through advanced SIEM technology and intrusion detection systems. Automated threat response capabilities immediately neutralize detected risks, while our incident response team provides human oversight for complex security events.

## Enterprise Data Protection

### Military-Grade Encryption
All data benefits from **TLS 1.3 encryption in transit and AES-256 encryption at rest**, ensuring your redirect configurations and analytics remain completely secure. Perfect Forward Secrecy generates unique session keys for every connection, while Certificate Transparency provides public verification of our SSL implementations.

### Zero-Trust Access Management
Administrative access requires **multi-factor authentication and follows strict role-based permissions** with quarterly access reviews. Session management includes automatic timeouts and secure token handling, ensuring only authorized personnel can access system components under the principle of least privilege.
              `,
            },
          ],
        },
      ],
    },
  ],
};
