import type { Industry, Topic } from './types';

export const topics: Topic[] = [
  {
    slug: 'domain-forwarding',
    name: 'Domain Forwarding',
    summary:
      'Route traffic between domains without downtime, keeping campaigns and legacy URLs intact.',
    intent: 'Safely move or consolidate domains while protecting rankings and analytics.',
    benefits: [
      'Instant HTTPS-ready redirects with no hosting overhead.',
      'Granular path rules for product, content, or campaign URLs.',
      'Reliable analytics for every redirect event and destination.',
    ],
    proofPoint: 'Built for marketing, engineering, and SEO teams who need zero-risk migrations.',
    industries: ['ecommerce', 'saas', 'media', 'finance'],
    locations: ['united-states', 'united-kingdom', 'canada', 'sydney-australia'],
    featured: true,
  },
  {
    slug: 'brand-migration',
    name: 'Brand Migration',
    summary:
      'Move from old brand domains to new ones with controlled, auditable redirect plans.',
    intent: 'Preserve link equity and customer trust during rebrands and acquisitions.',
    benefits: [
      'Staged rollout with monitoring across all legacy domains.',
      'Consistency for marketing tags, UTM parameters, and analytics.',
      'Automated rules to avoid broken links and lost SEO signals.',
    ],
    proofPoint: 'Trusted for high-stakes migrations where rankings and revenue matter.',
    industries: ['finance', 'saas', 'media', 'ecommerce'],
    locations: ['united-states', 'united-kingdom', 'canada', 'sydney-australia'],
    featured: true,
  },
  {
    slug: 'campaign-redirects',
    name: 'Campaign Redirects',
    summary:
      'Launch short-lived or evergreen campaigns with reusable redirect infrastructure.',
    intent: 'Create fast, trackable campaign URLs that scale with marketing velocity.',
    benefits: [
      'Rapid URL creation for ads, QR codes, and partner promotions.',
      'A/B testing support with traffic routing by rules and conditions.',
      'Unified analytics across every campaign link.',
    ],
    proofPoint: 'Designed for growth teams shipping new campaigns every week.',
    industries: ['ecommerce', 'media', 'saas', 'finance'],
    locations: ['united-states', 'united-kingdom', 'canada', 'sydney-australia'],
  },
  {
    slug: 'legacy-url-cleanup',
    name: 'Legacy URL Cleanup',
    summary: 'Retire outdated URLs while keeping valuable traffic flowing to updated pages.',
    intent: 'Reduce 404s, protect backlinks, and simplify long URL histories.',
    benefits: [
      'Bulk redirect management without touching application servers.',
      'Consolidate overlapping URLs into clean, canonical destinations.',
      'Monitor and resolve legacy URL spikes fast.',
    ],
    proofPoint: 'Ideal for large sites that have been publishing for years.',
    industries: ['media', 'education', 'ecommerce', 'finance'],
    locations: ['united-states', 'united-kingdom', 'canada'],
  },
  {
    slug: 'traffic-splitting',
    name: 'Traffic Splitting',
    summary: 'Split redirect traffic across destinations for testing, personalization, or rollouts.',
    intent: 'Experiment safely without risking outages or SEO regressions.',
    benefits: [
      'Control routing percentages without code deployments.',
      'Measure outcomes across experiments in one dashboard.',
      'Roll back instantly if results dip.',
    ],
    proofPoint: 'Used by teams validating new experiences before full launch.',
    industries: ['saas', 'ecommerce', 'technology', 'media'],
    locations: ['united-states', 'united-kingdom', 'canada'],
  },
  {
    slug: 'qr-code-redirects',
    name: 'QR Code Redirects',
    summary: 'Launch QR campaigns that stay flexible even after print or packaging.',
    intent: 'Keep QR destinations fresh while tracking real-world engagement.',
    benefits: [
      'Update destinations without reprinting collateral.',
      'Track scans across locations, channels, and campaigns.',
      'Ensure QR URLs are fast and secure.',
    ],
    proofPoint: 'Perfect for retail, events, and omnichannel marketing teams.',
    industries: ['retail', 'events', 'hospitality', 'education'],
    locations: ['united-states', 'united-kingdom', 'canada'],
  },
  {
    slug: 'international-redirects',
    name: 'International Redirects',
    summary: 'Route global traffic to localized experiences with consistent governance.',
    intent: 'Serve regional audiences while keeping canonical signals clean.',
    benefits: [
      'Direct visitors to the right language or region automatically.',
      'Maintain clear audit trails across all geographies.',
      'Ensure fast routing for global campaigns.',
    ],
    proofPoint: 'Built for global brands balancing localization and SEO.',
    industries: ['ecommerce', 'saas', 'travel', 'education'],
    locations: ['united-states', 'united-kingdom', 'canada'],
  },
];

export const industries: Industry[] = [
  {
    slug: 'ecommerce',
    name: 'Ecommerce',
    painPoint: 'Product catalog changes and seasonal campaigns can break URLs overnight.',
    outcomes: [
      'Keep product links live during migrations and catalog cleanups.',
      'Protect conversion paths with fast, reliable redirects.',
      'Attribute revenue back to the right campaigns.',
    ],
  },
  {
    slug: 'saas',
    name: 'SaaS',
    painPoint: 'Pricing, feature, and documentation URLs change as the product evolves.',
    outcomes: [
      'Safeguard SEO value for high-intent landing pages.',
      'Route legacy docs to updated product experiences.',
      'Maintain trusted links for every release.',
    ],
  },
  {
    slug: 'media',
    name: 'Media',
    painPoint: 'Editorial updates and syndication deals create complex URL histories.',
    outcomes: [
      'Preserve rankings as content gets refreshed or republished.',
      'Reduce 404s from old headlines or syndicated links.',
      'Keep audiences flowing to the latest stories.',
    ],
  },
  {
    slug: 'finance',
    name: 'Finance',
    painPoint: 'Compliance updates often require URL changes with strict tracking.',
    outcomes: [
      'Ensure regulated pages redirect without delays.',
      'Maintain audit trails for every change.',
      'Keep customer trust through consistent redirects.',
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    painPoint: 'Course catalogs and program pages shift frequently across semesters.',
    outcomes: [
      'Keep admissions and program links trustworthy.',
      'Route alumni and legacy content to updated pages.',
      'Track traffic to high-value academic programs.',
    ],
  },
  {
    slug: 'retail',
    name: 'Retail',
    painPoint: 'Campaign URLs need to pivot quickly for promotions and seasons.',
    outcomes: [
      'Keep QR codes and campaign links live across seasons.',
      'Route traffic to the right inventory with zero downtime.',
      'Measure revenue impact by channel and region.',
    ],
  },
  {
    slug: 'technology',
    name: 'Technology',
    painPoint: 'Rapid product releases can outpace URL governance.',
    outcomes: [
      'Protect SEO value during frequent launches.',
      'Direct legacy docs to updated experiences.',
      'Stay agile without breaking inbound links.',
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    painPoint: 'Property and campaign URLs shift with seasonal offers.',
    outcomes: [
      'Keep bookings flowing through consistent URLs.',
      'Track conversions by destination and offer.',
      'Avoid broken links during seasonal updates.',
    ],
  },
  {
    slug: 'travel',
    name: 'Travel',
    painPoint: 'Destination content changes rapidly with demand and availability.',
    outcomes: [
      'Route travelers to the latest offers and guides.',
      'Preserve rankings for destination pages.',
      'Monitor campaign performance across regions.',
    ],
  },
];
