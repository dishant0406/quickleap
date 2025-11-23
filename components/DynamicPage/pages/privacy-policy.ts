import type { PageConfig } from '@/components/DynamicPage/types';

export const privacyPolicyConfig: PageConfig = {
  title: 'Privacy Policy - QuickLeap',
  description: 'Learn about how QuickLeap collects, uses, and protects your data.',
  noIndex: false, // Ensure this page is indexed by search engines
  layout: {
    showNavbar: true,
    showFooter: true,
  },
  seo: {
    keywords: ['privacy policy', 'data protection', 'GDPR', 'QuickLeap'],
    canonicalUrl: 'https://quickleap.io/privacy',
  },
  components: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Privacy Policy',
      subtitle: 'Your privacy is important to us. Learn how we handle your data.',
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
          id: 'privacy-content',
          type: 'markdown',
          content: `
## Introduction

At QuickLeap, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our domain redirect services. We understand that your privacy is important to you, and we want to be transparent about our data practices so you can make informed decisions about using our services.

This Privacy Policy applies to all information collected through our website, mobile applications, and any related services, sales, marketing, or events. By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our services.

## Information We Collect

We collect several different types of information for various purposes to provide and improve our service to you. The information we collect can be broadly categorized into information you provide to us directly, information we collect automatically, and information we receive from third parties.

When you create an account with QuickLeap, you provide us with personal information such as your email address, which serves as your primary identifier for our services. You may also choose to provide additional information such as your name, company name, and billing information if you subscribe to our premium plans. This information helps us personalize your experience and provide you with the level of service you expect.

Our redirect services require you to provide domain names and destination URLs that you wish to redirect. This information is essential for our core functionality and is stored securely in our systems. We also collect configuration settings for your redirects, including any custom rules, timing preferences, and redirect types you specify. This data allows us to provide the redirect service exactly as you have configured it.

We automatically collect certain information about your device and usage patterns when you access our services. This includes your IP address, which we anonymize for privacy protection, browser type and version, operating system, device identifiers, and information about how you interact with our website and services. We collect timestamps of when you access our services, pages you visit, features you use, and the duration of your sessions. This information helps us understand how our services are being used and identify areas for improvement.

For analytics purposes, we collect aggregated and anonymized data about redirect traffic, including the number of redirects processed, geographic distribution of traffic, and performance metrics. This data is used solely for improving our service quality and is never tied back to individual users or specific redirect configurations.

## How We Use Your Information

We use the information we collect for various purposes, all aimed at providing you with the best possible service experience. Our primary use of your information is to provide and maintain our redirect services, including creating and managing your redirect configurations, processing redirects in real-time, monitoring service performance, and ensuring the reliability and security of our infrastructure.

Your account information is used to manage your subscription, process payments for premium features, provide customer support, and communicate important service-related information. We may use your email address to send you notifications about service updates, security alerts, billing information, and other transactional communications that are necessary for the operation of your account.

We analyze usage patterns and performance data to continuously improve our services. This includes identifying and fixing bugs, optimizing redirect performance, developing new features based on user needs, and enhancing the overall user experience. All analysis is conducted on aggregated, anonymized data to protect individual privacy.

With your explicit consent, we may use your contact information for marketing purposes, such as sending newsletters with product updates, educational content about domain management and redirect best practices, information about new features and services, and promotional offers. You can opt out of these communications at any time through your account settings or by following the unsubscribe instructions in our emails.

We also use your information to protect our services and users from fraudulent activity, abuse, and security threats. This includes monitoring for suspicious patterns, implementing security measures, and complying with legal obligations and law enforcement requests when required.

## Information Sharing and Disclosure

We do not sell, trade, rent, or otherwise transfer your personally identifiable information to outside parties except as described in this Privacy Policy. We believe in maintaining the confidentiality of your information and only share it when necessary to provide our services or when required by law.

We work with trusted third-party service providers who assist us in operating our website, conducting our business, and providing services to you. These providers include payment processors like Stripe for handling subscription payments and billing, email service providers like SendGrid for delivering transactional and marketing emails, cloud infrastructure providers for hosting our services and storing data securely, and analytics services for understanding service usage patterns.

All third-party service providers are carefully vetted and are contractually obligated to keep your information confidential and use it only for the specific purposes for which we have engaged them. They are prohibited from using your personal information for their own marketing purposes or sharing it with other parties.

We may disclose your information when we believe in good faith that such disclosure is necessary to comply with legal obligations, protect and defend our rights or property, protect the personal safety of our users or the public, or investigate possible wrongdoing in connection with our services. In the event of a business transaction such as a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the acquiring entity, subject to the same privacy protections outlined in this policy.

## Data Security and Protection

We implement comprehensive security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security practices include both technical and organizational safeguards designed to ensure the integrity and confidentiality of your data.

From a technical perspective, we use industry-standard encryption protocols to protect data both in transit and at rest. All communications between your browser and our servers are secured using SSL/TLS encryption, and sensitive data stored in our databases is encrypted using advanced encryption algorithms. We employ firewalls, intrusion detection systems, and regular security monitoring to protect against unauthorized access and potential security threats.

Our infrastructure is hosted on secure, SOC 2 compliant data centers with redundant systems and comprehensive backup procedures. We conduct regular security audits and penetration testing to identify and address potential vulnerabilities. Our development practices include security code reviews, automated security testing, and adherence to secure coding standards.

Organizationally, we maintain strict access controls to ensure that only authorized personnel have access to your personal information, and only to the extent necessary for their job functions. All employees receive regular training on data protection best practices and are bound by confidentiality agreements. We have implemented incident response procedures to quickly identify, contain, and remediate any potential security incidents.

## Your Rights and Control Over Your Information

We believe you should have control over your personal information, and we provide several mechanisms for you to exercise your privacy rights. You have the right to access the personal information we hold about you, including the ability to download a copy of your data in a commonly used, machine-readable format. This includes your account information, redirect configurations, and any other data associated with your account.

You can update or correct your personal information at any time through your account settings. If you notice any inaccuracies in the information we hold about you, please let us know so we can correct it promptly. You also have the right to request deletion of your personal information, subject to certain legal limitations. When you delete your account, we will remove your personal information from our active systems, though some information may be retained in backups for a limited period for security and legal compliance purposes.

You have granular control over the communications you receive from us. You can opt out of marketing emails while continuing to receive important transactional communications, or you can choose to receive only critical security and billing notifications. These preferences can be managed through your account settings or by following the unsubscribe instructions in our emails.

For users in certain jurisdictions, additional rights may apply, including the right to object to processing, the right to data portability, and the right to lodge complaints with supervisory authorities. We are committed to honoring these rights and will respond to requests in accordance with applicable laws.

## International Data Transfers and Global Operations

QuickLeap operates as a global service, and your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. However, we ensure that appropriate safeguards are in place to protect your personal information regardless of where it is processed.

For transfers to countries that have been deemed to provide adequate protection for personal data, we rely on these adequacy decisions. For transfers to other countries, we implement appropriate safeguards such as standard contractual clauses approved by relevant data protection authorities, certification schemes, or other legally approved mechanisms to ensure your data receives the same level of protection as it would in your home country.

We regularly review our international data transfer practices to ensure compliance with evolving privacy laws and regulations. If you have specific concerns about international transfers of your data, please contact us for more information about the safeguards we have in place for your particular situation.

## Cookies and Tracking Technologies

We use cookies and similar tracking technologies to enhance your experience on our website and provide our services effectively. Cookies are small data files that are placed on your device when you visit our website. We use different types of cookies for various purposes, and we want to be transparent about how we use these technologies.

Essential cookies are necessary for the basic functionality of our website and services. These include session cookies that keep you logged in, preference cookies that remember your settings, and security cookies that protect against fraudulent activity. These cookies are critical for the operation of our services and cannot be disabled without significantly impacting functionality.

We also use analytics cookies to understand how visitors interact with our website. These cookies help us analyze traffic patterns, identify popular content, and understand user behavior so we can improve our website and services. The data collected through analytics cookies is aggregated and anonymized to protect individual privacy.

Performance cookies help us optimize the speed and reliability of our services by monitoring system performance and identifying areas for improvement. These cookies collect information about page load times, server response times, and other technical metrics that help us maintain high service quality.

You have control over cookie settings through your browser preferences. Most browsers allow you to view, manage, and delete cookies, as well as block cookies from specific websites. However, please note that disabling certain cookies may limit the functionality of our website and services.

## Data Retention and Deletion

We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. The specific retention period varies depending on the type of information and the purpose for which it was collected.

Account information is retained for the duration of your active account and for a reasonable period after account closure to comply with legal obligations and resolve any potential disputes. Redirect configuration data is retained as long as your redirects are active and for a brief period after deletion to allow for potential restoration if needed.

Analytics and usage data is typically aggregated and anonymized shortly after collection and may be retained for longer periods for trend analysis and service improvement purposes. However, this aggregated data cannot be used to identify individual users.

When you request deletion of your account or specific information, we will permanently delete your data from our active systems within a reasonable timeframe, typically within 30 days. Some information may be retained in backups for up to 90 days for security and disaster recovery purposes, after which it is permanently deleted.

We regularly review our data retention practices to ensure we are not keeping information longer than necessary and to comply with evolving legal requirements and best practices in data protection.

## Contact Information and Privacy Inquiries

If you have any questions about this Privacy Policy, our data practices, or your privacy rights, we encourage you to contact us. We are committed to addressing your concerns promptly and transparently.

You can reach our privacy team by email at privacy@quickleap.io. For GDPR-related inquiries from European Union residents, please include "GDPR Request" in the subject line to ensure your inquiry is routed to the appropriate team member who specializes in European privacy regulations.

For other privacy-related inquiries, you can also contact us through our general support channels or by mail at our corporate address. We strive to respond to all privacy inquiries within 30 days, though we often respond much sooner.

If you are not satisfied with our response to your privacy inquiry, or if you believe we are processing your personal information in violation of applicable privacy laws, you have the right to lodge a complaint with the appropriate data protection authority in your jurisdiction.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. When we make material changes to this policy, we will notify you through multiple channels to ensure you are aware of the updates.

We will post the updated Privacy Policy on our website with a new effective date, send email notifications to all registered users about significant changes, display prominent notices in our dashboard and website, and provide summaries of key changes when the updates are substantial.

We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our services after any modifications to this Privacy Policy constitutes your acceptance of the updated terms. If you do not agree with any changes, you have the right to discontinue use of our services and request deletion of your account and personal information.

The date of the last update to this Privacy Policy is indicated at the top of this document, and we maintain an archive of previous versions for reference purposes.
          `,
        },
      ],
    },
  ],
};
