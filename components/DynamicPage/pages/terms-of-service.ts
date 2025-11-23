import type { PageConfig } from '@/components/DynamicPage/types';

export const termsOfServiceConfig: PageConfig = {
  title: 'Terms of Service - QuickLeap',
  description: 'Terms and conditions for using QuickLeap domain redirect services.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['terms of service', 'terms and conditions', 'user agreement', 'QuickLeap'],
    canonicalUrl: 'https://quickleap.io/terms',
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Terms of Service',
      subtitle: 'Terms and conditions for using QuickLeap services.',
      height: 'screen',
      backgroundPattern: true,
    },
    {
      id: 'main-container',
      type: 'container',
      layout: 'wide',
      padding: 'lg',
      children: [
        {
          id: 'last-updated',
          type: 'text',
          content: 'Last updated: November 9, 2025',
          size: 'sm',
          color: 'muted',
          align: 'center',
        },
        {
          id: 'spacer-1',
          type: 'spacer',
          height: 'lg',
        },
        {
          id: 'terms-content',
          type: 'markdown',
          content: `
## Agreement to Terms and Acceptance

By accessing, browsing, or using the QuickLeap website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations. These terms constitute a legally binding agreement between you and QuickLeap regarding your use of our domain redirection services. If you do not agree with any part of these terms, you are prohibited from using or accessing this service and should discontinue use immediately.

Your acceptance of these terms is demonstrated through various actions, including but not limited to creating an account, using our redirect services, making payments for premium features, or simply continuing to browse our website after these terms have been posted. We reserve the right to update these terms at any time, and your continued use of the service after such updates constitutes acceptance of the revised terms.

## Comprehensive Service Description

QuickLeap is a comprehensive domain redirection platform designed to provide businesses, organizations, and individuals with robust, reliable, and scalable solutions for managing web traffic redirection. Our service operates on a global infrastructure that ensures high availability and optimal performance for redirect operations across multiple geographic regions.

Our core service offerings include domain and subdomain redirection capabilities that allow users to seamlessly direct web traffic from one location to another. This includes support for various redirect types such as permanent redirects, temporary redirects, conditional redirects based on user location or device type, and advanced rule-based redirections that can be customized according to specific business requirements.

The platform provides comprehensive analytics and monitoring tools that give users detailed insights into their redirect traffic patterns, including real-time statistics, geographic distribution of visitors, device and browser analytics, referrer information, and historical data trends. These analytics are presented through an intuitive dashboard that makes it easy to understand and act upon the data.

Our infrastructure management includes automatic SSL certificate provisioning and management, ensuring that all redirects maintain security standards and provide encrypted connections. We handle DNS configuration complexities behind the scenes, making it simple for users to set up and manage redirects without requiring deep technical knowledge of internet infrastructure.

The service includes API access for users who need to integrate redirect management into their existing workflows or applications. This API provides programmatic access to all redirect management functions, analytics data, and configuration options, enabling automation and integration with third-party systems.

## Account Registration and Management

Creating an account with QuickLeap requires you to be at least eighteen years of age and have the legal capacity to enter into binding agreements. During the registration process, you must provide accurate, current, and complete information about yourself as prompted by our registration form. This information typically includes your email address, which serves as your primary account identifier, and may include additional information such as your name, company affiliation, and billing details for premium services.

You are solely responsible for maintaining the confidentiality of your account credentials, including your password and any other authentication factors. You agree to immediately notify QuickLeap of any unauthorized use of your account or any other breach of security. You understand and acknowledge that you are fully responsible for all activities that occur under your account, whether or not you have authorized such activities.

QuickLeap reserves the right to refuse service, terminate accounts, or cancel orders at our sole discretion, particularly in cases where we determine that the account is being used for prohibited purposes or in violation of these terms. We also reserve the right to limit the number of accounts that any individual or entity may maintain, particularly for free service tiers.

You agree to keep your account information current and accurate at all times. This includes updating your contact information, billing details, and any other account-related information promptly when changes occur. Failure to maintain accurate account information may result in service interruptions or account suspension.

## Detailed Acceptable Use Policy

Our acceptable use policy is designed to ensure that QuickLeap services are used in a manner that is legal, ethical, and does not interfere with the rights of others or the proper functioning of our services. You agree to use QuickLeap services only for lawful purposes and in accordance with these terms and all applicable local, state, national, and international laws and regulations.

You may use our services to redirect domains that you own or for which you have explicit permission to manage DNS settings. This includes legitimate business redirections such as brand consolidation, marketing campaign management, website migrations, temporary maintenance pages, geographic routing for international businesses, and other legitimate business purposes that require traffic redirection.

However, there are specific activities that are strictly prohibited when using our services. You may not use QuickLeap to redirect traffic for any illegal activities, including but not limited to copyright or trademark infringement, fraud, phishing attempts, identity theft, money laundering, drug trafficking, or any other activities that violate local, state, federal, or international laws.

The distribution or promotion of harmful content is strictly forbidden. This includes malware, viruses, trojan horses, or any other malicious software, as well as content that promotes violence, hatred, discrimination, harassment, or threatens the safety of individuals or groups. Adult content, pornography, and sexually explicit material are also prohibited from being accessed through our redirect services.

Technical abuse of our services is not tolerated and includes attempts to circumvent service limitations, interfere with our infrastructure, engage in denial-of-service attacks, attempt unauthorized access to our systems or other users' accounts, or use our services for cryptocurrency mining, high-volume automated traffic generation, or other activities that place excessive load on our infrastructure.

Commercial activities that compete directly with QuickLeap or attempt to resell our services without explicit permission are prohibited. Additionally, you may not use our services for spam generation, unsolicited commercial communications, or any form of automated abuse that could negatively impact other users or the internet community at large.

## Service Availability and Performance Standards

QuickLeap strives to maintain high availability and reliable performance for all our redirect services. While we work diligently to provide consistent uptime and fast response times, we operate in a complex internet environment where various factors beyond our control can affect service performance. Our target availability is 99.9% uptime, measured monthly and excluding scheduled maintenance windows.

We implement redundant infrastructure across multiple data centers and geographic regions to minimize the impact of hardware failures, network issues, or other infrastructure problems. Our monitoring systems continuously track service performance and automatically alert our technical team to any issues that may affect service quality.

Scheduled maintenance will be announced in advance through multiple channels, including email notifications to registered users, dashboard notices, and status page updates. We typically schedule maintenance during off-peak hours to minimize disruption, and we work to complete maintenance activities as quickly as possible.

However, you acknowledge and agree that internet services are inherently subject to various factors that can affect performance and availability. These factors include DNS propagation delays, internet service provider issues, domain registrar problems, certificate authority delays, and force majeure events such as natural disasters, power outages, or network infrastructure failures that are beyond our reasonable control.

QuickLeap does not guarantee uninterrupted service or error-free operation. We provide our services on an "as is" basis without warranties of any kind, either express or implied. Performance may vary based on geographic location, internet infrastructure, and other factors beyond our control.

## Comprehensive Payment Terms and Billing

Our billing practices are designed to be transparent, fair, and compliant with applicable consumer protection laws. Subscription fees for premium services are billed in advance on a recurring basis according to the billing cycle you select during signup. We offer various billing cycles including monthly, quarterly, and annual options, with discounts typically available for longer-term commitments.

All fees are charged in United States dollars unless otherwise specified, and payment must be made through the payment methods we support, which currently include major credit cards and electronic payment systems. You are responsible for providing accurate and current billing information and for maintaining sufficient funds or credit to cover your subscription fees.

Unless otherwise required by applicable law, all fees are non-refundable. This includes situations where you choose to downgrade your service level, terminate your account early, or do not fully utilize the features included in your subscription plan. However, we may, at our sole discretion, provide refunds in cases of extended service outages or other exceptional circumstances.

We reserve the right to modify our pricing at any time, but price changes for existing subscriptions will be communicated to you at least thirty days in advance. You will have the opportunity to cancel your subscription before the new pricing takes effect if you do not agree to the price changes.

Failed payments may result in service suspension or termination. We will make reasonable attempts to process failed payments and will notify you of payment issues. If payment problems persist, we may suspend your service until payment is received, and prolonged non-payment may result in account termination and data deletion.

For enterprise customers and high-volume users, custom pricing and billing arrangements may be available through direct negotiation with our sales team. These arrangements will be documented in separate agreements that supplement these general terms of service.

## Intellectual Property Rights and Protections

QuickLeap and all associated intellectual property, including but not limited to software, technology, algorithms, user interfaces, documentation, trademarks, service marks, trade names, and copyrighted materials, are and remain the exclusive property of QuickLeap and its licensors. These terms do not grant you any ownership rights in our intellectual property, and all rights not expressly granted are reserved.

You are granted a limited, non-exclusive, non-transferable, revocable license to use QuickLeap services solely for the purposes outlined in these terms. This license does not permit you to copy, modify, distribute, sell, or lease any part of our services or included software, nor does it permit you to reverse engineer or attempt to extract the source code of our software unless laws prohibit such restrictions or you have our written permission.

Our trademarks, logos, and service marks may not be used in connection with any product or service that is not ours, in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits QuickLeap. Any unauthorized use of our trademarks or other intellectual property may constitute trademark infringement and unfair competition in violation of applicable laws.

Regarding content that you redirect through our services, you retain all ownership rights to your domains, websites, and any content that is redirected. However, by using our services, you grant QuickLeap a limited license to access, cache, and process your content solely for the purpose of providing redirect services. This license includes the right to temporarily store and process redirect destinations and any associated metadata necessary for service operation.

You represent and warrant that you have all necessary rights, licenses, and permissions to redirect the domains and content you configure through our services. You agree to indemnify QuickLeap against any claims that your use of our services infringes upon the intellectual property rights of any third party.

## Privacy, Data Protection, and Security

Your privacy and the security of your data are fundamental concerns for QuickLeap. We have implemented comprehensive privacy and security measures designed to protect your personal information and ensure compliance with applicable data protection laws, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other relevant privacy legislation.

Our data collection practices are designed around the principle of data minimization, meaning we collect only the information necessary to provide our services effectively. This includes account information such as your email address and billing details, technical information necessary for service operation such as domain configurations and redirect rules, and analytics data that helps us improve service performance and reliability.

All data transmission between your devices and our servers is encrypted using industry-standard SSL/TLS protocols. Data stored on our servers is encrypted at rest using advanced encryption algorithms, and access to your data is strictly controlled through multi-factor authentication and role-based access controls for our staff.

We do not sell, rent, or otherwise monetize your personal data. We may share your information with trusted service providers who assist us in operating our services, such as payment processors, email service providers, and infrastructure partners, but only to the extent necessary for them to provide their services to us, and always under strict confidentiality agreements.

You have comprehensive rights regarding your personal data, including the right to access, correct, delete, or export your information. You can exercise many of these rights directly through your account dashboard, or you can contact our privacy team for assistance with more complex requests.

## Service Modifications, Updates, and Termination

QuickLeap reserves the right to modify, update, or discontinue any aspect of our services at any time, with or without notice, though we will generally provide reasonable advance notice for significant changes that may affect your use of the service. This includes the right to add new features, modify existing functionality, change system requirements, or discontinue features that are no longer viable or widely used.

When we make significant changes to our services, we will communicate these changes through appropriate channels, which may include email notifications, dashboard announcements, blog posts, or direct communication for enterprise customers. For changes that materially affect your ability to use the service, we will provide at least thirty days' advance notice when possible.

You may terminate your account and stop using our services at any time by following the account closure process outlined in your account settings. Upon termination, your access to the service will cease, and we will delete your account data according to our data retention policies outlined in our Privacy Policy.

QuickLeap may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the service will cease immediately, and any data associated with your account may be deleted.

In the event of service termination by either party, we will provide reasonable assistance in helping you export your redirect configurations and analytics data, subject to technical limitations and our data retention policies. However, we cannot guarantee the availability of data export services indefinitely after account termination.

## Comprehensive Limitation of Liability

You understand and agree that QuickLeap and its subsidiaries, affiliates, officers, employees, agents, partners, and licensors shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses resulting from your use or inability to use the service.

This limitation includes damages resulting from unauthorized access to or alteration of your transmissions or data, statements or conduct of any third party on the service, or any other matter relating to the service. Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages, so the above limitations may not apply to you.

In no event shall QuickLeap's total liability to you for all damages, losses, and causes of action exceed the amount you have paid to QuickLeap in the twelve months preceding the claim, or one hundred dollars, whichever is greater. This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis.

You specifically acknowledge that QuickLeap shall not be liable for user submissions or the defamatory, offensive, or illegal conduct of any third party, and that the risk of harm or damage from the foregoing rests entirely with you. The service is provided on an "as-is" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.

## Indemnification and Legal Protection

You agree to defend, indemnify, and hold harmless QuickLeap and its subsidiaries, affiliates, officers, agents, employees, partners, and licensors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses including but not limited to attorney's fees arising from your use of and access to the service, your violation of any term of these Terms, your violation of any third-party right including without limitation any copyright, property, or privacy right, or any claim that your use of the service caused damage to a third party.

This indemnification obligation will survive the termination of your account and these Terms. You acknowledge that QuickLeap has no obligation to monitor your use of the service, but reserves the right to do so to ensure compliance with these Terms and applicable laws.

In the event that we receive a claim related to your use of our services, we will notify you promptly and may require you to take over the defense of such claim. We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you, in which case you will cooperate with us in asserting any available defenses.

## Dispute Resolution and Governing Law

These Terms and any disputes arising out of or related to these Terms or your use of QuickLeap services shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. You and QuickLeap agree to submit to the personal jurisdiction of the state and federal courts located in Delaware for the purpose of litigating all such disputes.

Before resorting to formal legal proceedings, we encourage you to contact our customer service team to attempt to resolve any disputes informally. Many issues can be resolved quickly and satisfactorily through direct communication, and we are committed to working with you in good faith to address any concerns you may have about our services.

For certain types of disputes, we may require binding arbitration as an alternative to court proceedings. If arbitration is required, it will be conducted under the rules of the American Arbitration Association, and the arbitrator's decision will be final and binding. However, either party may seek equitable relief in court for intellectual property infringement or other matters where arbitration may not be appropriate.

## Contact Information and Customer Support

If you have any questions about these Terms of Service, need clarification about any provisions, or wish to report violations of these terms, please contact us through the following channels. Our legal team is available to address any questions or concerns about the legal aspects of our service and your rights and obligations under these terms.

For legal and compliance questions, you can reach us at legal@quickleap.io. For general customer support, technical assistance, or account-related questions, please contact our support team at support@quickleap.io or through the help center accessible from your account dashboard.

We strive to respond to all inquiries promptly and provide helpful, accurate information to ensure you can use our services effectively and in compliance with these terms. Our support team is trained to handle a wide variety of questions and can escalate complex issues to appropriate specialists when necessary.

## Changes and Updates to These Terms

QuickLeap reserves the right to modify these Terms of Service at any time to reflect changes in our services, business practices, or legal requirements. When we make changes to these terms, we will update the "Last Modified" date at the top of this document and take appropriate steps to notify users of significant changes.

For material changes that substantially affect your rights or obligations, we will provide at least thirty days' advance notice through email to your registered email address, prominent notices on our website and in your account dashboard, and other appropriate communication channels. For minor changes such as clarifications or updates that do not materially affect the substance of these terms, we may provide notice through our website or other means as appropriate.

Your continued use of QuickLeap services after any modification to these Terms constitutes your acceptance of such modifications. If you do not agree to the modified terms, your sole remedy is to discontinue use of the service and terminate your account. We encourage you to review these terms periodically to stay informed of any updates or changes.
          `,
        },
      ],
    },
  ],
};
