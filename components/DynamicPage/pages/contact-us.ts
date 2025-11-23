import type { PageConfig } from '@/components/DynamicPage/types';

export const contactUsConfig: PageConfig = {
  title: 'Contact Us - QuickLeap',
  description: 'Get in touch with our team for support, sales, or partnership inquiries.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['contact', 'support', 'help', 'sales', 'QuickLeap'],
    canonicalUrl: 'https://quickleap.io/contact',
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Contact Us',
      subtitle: 'Get in touch with our team for support, sales, or partnership inquiries.',
      height: 'screen',
      backgroundPattern: true,
      badges: ['24/7 Support', 'Quick Response'],
    },
    {
      id: 'main-container',
      type: 'container',
      layout: 'contained',
      padding: 'lg',
      children: [
        {
          id: 'contact-methods-section',
          type: 'section',
          title: 'How Can We Help?',
          subtitle: 'Choose the best way to reach us based on your needs',
          children: [
            {
              id: 'contact-grid',
              type: 'grid',
              columns: { xs: 1, md: 2, lg: 3 },
              gap: 'lg',
              children: [
                {
                  id: 'support-contact',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Headphones',
                  title: 'Technical Support',
                  description: 'Get help with redirects, troubleshooting, and technical questions.',
                },
                {
                  id: 'sales-contact',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'ShoppingCart',
                  title: 'Sales & Pricing',
                  description: 'Learn about our plans, pricing, and enterprise solutions.',
                },
                {
                  id: 'partnership-contact',
                  type: 'featureBox',
                  variant: 'small',
                  icon: 'Handshake',
                  title: 'Partnerships',
                  description: 'Explore partnership opportunities and integrations.',
                },
              ],
            },
          ],
        },
        {
          id: 'contact-details-section',
          type: 'section',
          title: 'Contact Information',
          children: [
            {
              id: 'contact-details-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'contact-info',
                  type: 'card',
                  title: 'Get In Touch',
                  shadow: true,
                  children: [
                    {
                      id: 'contact-info-content',
                      type: 'markdown',
                      content: `
## Email Support
- **General Support**: support@quickleap.io
- **Sales Inquiries**: sales@quickleap.io
- **Partnership**: partnerships@quickleap.io
- **Privacy Questions**: privacy@quickleap.io
- **Legal Matters**: legal@quickleap.io

## Response Times
- **Paid Plans**: Within 4 hours (business days)
- **Free Plans**: Within 24 hours (business days)
- **Enterprise**: Within 1 hour (24/7)
- **Critical Issues**: Immediate response for paid customers

## Phone Support
- **Enterprise Customers**: Dedicated phone line
- **Priority Support**: Available for Pro+ plans
- **Business Hours**: Monday-Friday, 9 AM - 6 PM PST
- **Emergency Line**: 24/7 for enterprise customers
                      `,
                    },
                  ],
                },
                {
                  id: 'office-info',
                  type: 'card',
                  title: 'Office Locations',
                  shadow: true,
                  children: [
                    {
                      id: 'office-info-content',
                      type: 'markdown',
                      content: `
## Headquarters
**QuickLeap Inc.**  
123 Tech Street, Suite 100  
San Francisco, CA 94105  
United States

## European Office
**QuickLeap Europe**  
456 Innovation Avenue  
Dublin, Ireland  
D02 XY89

## Business Hours
- **US Office**: Monday-Friday, 9 AM - 6 PM PST
- **EU Office**: Monday-Friday, 9 AM - 5 PM GMT
- **Support**: 24/7 for enterprise customers
- **Sales**: Monday-Friday, business hours
                      `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'support-options-section',
          type: 'section',
          title: 'Support Options',
          subtitle: 'Multiple ways to get the help you need',
          children: [
            {
              id: 'support-options-grid',
              type: 'grid',
              columns: { xs: 1, md: 2 },
              gap: 'lg',
              children: [
                {
                  id: 'self-service',
                  type: 'card',
                  title: 'Self-Service Resources',
                  shadow: true,
                  children: [
                    {
                      id: 'self-service-content',
                      type: 'markdown',
                      content: `
### Knowledge Base
- **Getting Started Guide**: Step-by-step setup instructions
- **FAQ**: Answers to common questions
- **Video Tutorials**: Visual guides for complex tasks
- **API Documentation**: Complete developer resources

### Tools & Utilities
- **DNS Checker**: Verify your DNS configuration
- **Redirect Tester**: Test your redirects before going live
- **SSL Validator**: Check SSL certificate status
- **Performance Monitor**: Track redirect response times

### Community
- **User Forum**: Connect with other QuickLeap users
- **Feature Requests**: Vote on upcoming features
- **Best Practices**: Learn from community experts
- **Success Stories**: See how others use QuickLeap
                      `,
                    },
                  ],
                },
                {
                  id: 'premium-support',
                  type: 'card',
                  title: 'Premium Support',
                  shadow: true,
                  children: [
                    {
                      id: 'premium-support-content',
                      type: 'markdown',
                      content: `
### Priority Support
- **Faster Response Times**: Get help within hours, not days
- **Expert Engineers**: Direct access to technical specialists
- **Screen Sharing**: Real-time troubleshooting sessions
- **Phone Support**: Speak directly with our team

### Enterprise Support
- **Dedicated Account Manager**: Your personal point of contact
- **Custom Onboarding**: Tailored setup and training
- **SLA Guarantees**: Guaranteed response and resolution times
- **24/7 Availability**: Round-the-clock support when you need it

### Professional Services
- **Migration Assistance**: Help moving from other platforms
- **Custom Integrations**: Tailored API implementations
- **Training Sessions**: Team training and best practices
- **Strategic Consulting**: Optimize your redirect strategy
                      `,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'faq-section',
          type: 'section',
          title: 'Frequently Asked Questions',
          children: [
            {
              id: 'contact-faq',
              type: 'accordion',
              allowMultiple: true,
              items: [
                {
                  title: 'How quickly will I get a response to my support request?',
                  content:
                    'Response times vary by plan: Enterprise customers get responses within 1 hour, paid plans within 4 hours, and free plans within 24 hours during business days. Critical issues for paid customers receive immediate attention.',
                },
                {
                  title: 'Do you offer phone support?',
                  content:
                    'Phone support is available for Pro+ and Enterprise customers. Enterprise customers have access to a dedicated phone line with 24/7 availability. Other customers can request callback scheduling for complex issues.',
                },
                {
                  title: 'Can I schedule a demo or consultation?',
                  content:
                    'Yes! We offer free demos for potential customers and paid consultations for optimization advice. Contact our sales team at sales@quickleap.io to schedule a personalized demo or discuss your specific needs.',
                },
                {
                  title: 'What information should I include in my support request?',
                  content:
                    "Include your account email, domain name(s) affected, detailed description of the issue, steps you've already tried, and any error messages. Screenshots or screen recordings are also helpful for troubleshooting.",
                },
                {
                  title: 'Do you provide migration assistance?',
                  content:
                    'Yes, we offer migration assistance for customers switching from other redirect services. This includes configuration transfer, DNS guidance, and testing support. Premium migration services are available for complex setups.',
                },
                {
                  title: 'How can I request a new feature?',
                  content:
                    'Feature requests can be submitted through our user forum, via email to support@quickleap.io, or through the feedback widget in your dashboard. We regularly review and prioritize requests based on user demand and strategic value.',
                },
              ],
            },
          ],
        },
        {
          id: 'contact-form-section',
          type: 'section',
          title: 'Send Us a Message',
          subtitle: "Can't find what you're looking for? Send us a direct message.",
          children: [
            {
              id: 'contact-form-info',
              type: 'card',
              title: 'Contact Form',
              description: 'For the fastest response, please use our support portal',
              shadow: true,
              children: [
                {
                  id: 'form-info',
                  type: 'markdown',
                  content: `
## Submit a Support Request

Visit our **[Support Portal](https://support.quickleap.io)** to:
- Submit detailed support tickets
- Track the status of your requests
- Access your support history
- Upload files and screenshots

## Quick Contact

For general inquiries, you can also reach us at:
- **Email**: hello@quickleap.io
- **Twitter**: @QuickLeapIO
- **LinkedIn**: QuickLeap Inc.

## Business Inquiries

For partnership, press, or business development:
- **Email**: business@quickleap.io
- **Phone**: Available upon request
- **LinkedIn**: Connect with our team

*We typically respond to all inquiries within 24 hours during business days.*
                  `,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
