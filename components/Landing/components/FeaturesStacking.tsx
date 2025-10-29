'use client';

import StackingCard from '@/components/ui/stacking-card';
import { createStaticImageURL } from '@/lib/constants';

const FeatureImageMapping = {
  'Simple Domain Redirects': 'SCR-20251029-lhdo.webp',
  'Path & Query Forwarding': 'SCR-20251029-lgyf.webp',
  'Custom Domain Support': 'SCR-20251029-lhkl.webp',
  'Advanced Analytics & Monitoring': 'SCR-20251029-lhvp.webp',
  'Intelligent Rule-Based Redirects': 'SCR-20251029-lhsb.webp',
  'Powerful API Integration': 'SCR-20251029-lhqc.webp',
};

const FeaturesStacking = (): React.JSX.Element => {
  const features = [
    {
      title: 'Simple Domain Redirects',
      description:
        'Set up domain redirects in minutes with just a few clicks. Support for both 301 (permanent) and 302 (temporary) redirects. No hosting required, no technical expertise needed - just point your domain and go.',
      link: createStaticImageURL(FeatureImageMapping['Simple Domain Redirects']),
      color: 'bg-main',
    },
    {
      title: 'Path & Query Forwarding',
      description:
        'Preserve your URL structure with intelligent path forwarding and query parameter support. Perfect for maintaining SEO value during migrations and ensuring seamless user experience across domain changes.',
      link: createStaticImageURL(FeatureImageMapping['Path & Query Forwarding']),
      color: 'bg-bw',
    },
    {
      title: 'Custom Domain Support',
      description:
        'Use your own domain names for seamless branding. Support for unlimited domains with automatic DNS configuration assistance, domain verification, and full HTTPS/SSL certificate management - all handled automatically.',
      link: createStaticImageURL(FeatureImageMapping['Custom Domain Support']),
      color: 'bg-bg',
    },
    {
      title: 'Advanced Analytics & Monitoring',
      description:
        'Get deep insights into your traffic with comprehensive analytics. Track visitor locations, devices, browsers, peak traffic times, return visitors, and bot detection. Monitor everything in real-time with beautiful charts and detailed breakdowns.',
      link: createStaticImageURL(FeatureImageMapping['Advanced Analytics & Monitoring']),
      color: 'bg-main',
    },
    {
      title: 'Intelligent Rule-Based Redirects',
      description:
        'Create sophisticated redirect rules based on geographic location, device type, browser, time of day, and custom conditions. Perfect for A/B testing, regional targeting, and personalized user experiences.',
      link: createStaticImageURL(FeatureImageMapping['Intelligent Rule-Based Redirects']),
      color: 'bg-bw',
    },
    {
      title: 'Powerful API Integration',
      description:
        'Automate your workflow with our RESTful API. Programmatically manage redirects, set up webhooks for events, and integrate seamlessly with your CI/CD pipeline. Full documentation and OAuth authentication included.',
      link: createStaticImageURL(FeatureImageMapping['Powerful API Integration']),
      color: 'bg-bg',
    },
  ];

  return (
    <div className="relative bg-bg" id="features-stacking">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-bg to-transparent z-10" />
      <StackingCard projects={features} />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-bg to-transparent z-10" />
    </div>
  );
};

export default FeaturesStacking;
