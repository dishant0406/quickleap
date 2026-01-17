import { env } from '@/lib/env';

import type { GeoPlace, Industry, ProgrammaticPage, SeoBreadcrumb, SeoFaq, SeoSection, Topic } from './types';

const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';

const buildBreadcrumbs = (slug: string[], label: string): SeoBreadcrumb[] => {
  const base = [
    { name: 'Home', url: siteUrl },
    { name: 'Solutions', url: `${siteUrl}/solutions` },
  ];
  const path = slug.join('/');
  return [
    ...base,
    {
      name: label,
      url: `${siteUrl}/solutions/${path}`,
    },
  ];
};

const buildGeoBreadcrumbs = (topic: Topic, geo: GeoPlace): SeoBreadcrumb[] => [
  { name: 'Home', url: siteUrl },
  { name: 'Solutions', url: `${siteUrl}/solutions` },
  { name: topic.name, url: `${siteUrl}/solutions/${topic.slug}` },
  { name: geo.name, url: `${siteUrl}/solutions/${topic.slug}/in/${geo.slug}` },
];

const buildMeta = (title: string, description: string, slug: string[]): ProgrammaticPage['meta'] => ({
  title,
  description,
  canonicalPath: `/solutions/${slug.join('/')}`,
  ogImage: 'https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/og.png',
});

const buildSections = (topic: Topic, focus: string, angle: string[]): SeoSection[] => [
  {
    heading: `Why ${topic.name.toLowerCase()} leaders choose QuickLeap`,
    body: [
      topic.intent,
      `Our platform keeps redirects fast, auditable, and optimized for ${focus.toLowerCase()} teams.`,
    ],
  },
  {
    heading: `Outcomes you can measure`,
    body: angle,
  },
  {
    heading: `Built-in safeguards for scale`,
    body: [
      'Automatic HTTPS with verified certificates for every redirected domain.',
      'Rule-level analytics so you can prove impact and spot regressions quickly.',
      'Reliable infrastructure that keeps every redirect traceable and reversible.',
    ],
  },
];

const buildFaqs = (topic: Topic, qualifier: string): SeoFaq[] => [
  {
    question: `How does QuickLeap handle ${qualifier.toLowerCase()} redirects?`,
    answer: `QuickLeap centralizes redirect logic so ${qualifier.toLowerCase()} teams can launch, monitor, and audit every redirect without server changes.`,
  },
  {
    question: 'Will redirects affect SEO performance?',
    answer:
      'We prioritize clean 301/302 routing, canonical consistency, and fast responses so ranking signals stay intact.',
  },
  {
    question: 'Can I measure redirect performance?',
    answer:
      'Yes. Built-in analytics track every request, destination, and rule so you can validate outcomes.',
  },
  {
    question: `What makes ${topic.name.toLowerCase()} migrations safer?`,
    answer: topic.proofPoint,
  },
];

export const buildTopicHubPage = (
  topic: Topic,
  related: ProgrammaticPage['relatedLinks']
): ProgrammaticPage => {
  const slug = [topic.slug];
  const title = `${topic.name} Platform for Secure Redirects | QuickLeap`;
  const description = `${topic.summary} ${topic.intent}`;
  const h1 = `${topic.name} redirects built for scale`;
  const intro = topic.summary;

  return {
    template: 'topic',
    slug,
    intentKey: `topic:${topic.slug}`,
    title,
    h1,
    description,
    intro,
    sections: buildSections(topic, topic.name, topic.benefits),
    faqs: buildFaqs(topic, topic.name),
    breadcrumbs: buildBreadcrumbs(slug, topic.name),
    relatedLinks: related,
    meta: buildMeta(title, description, slug),
    updatedAt: new Date().toISOString(),
  };
};

export const buildIndustryPage = (
  topic: Topic,
  industry: Industry,
  related: ProgrammaticPage['relatedLinks']
): ProgrammaticPage => {
  const slug = [topic.slug, industry.slug];
  const title = `${topic.name} for ${industry.name} Teams | QuickLeap`;
  const description = `${industry.painPoint} ${topic.summary}`;
  const h1 = `${topic.name} for ${industry.name}`;
  const intro = `${industry.painPoint} QuickLeap keeps ${industry.name.toLowerCase()} redirects fast, measured, and reliable.`;
  const sections = buildSections(topic, industry.name, industry.outcomes);
  const faqs = buildFaqs(topic, industry.name);

  return {
    template: 'industry',
    slug,
    intentKey: `industry:${topic.slug}:${industry.slug}`,
    title,
    h1,
    description,
    intro,
    sections,
    faqs,
    breadcrumbs: buildBreadcrumbs(slug, `${topic.name} for ${industry.name}`),
    relatedLinks: related,
    meta: buildMeta(title, description, slug),
    updatedAt: new Date().toISOString(),
  };
};

export const buildGeoPage = (
  topic: Topic,
  geo: GeoPlace,
  related: ProgrammaticPage['relatedLinks']
): ProgrammaticPage => {
  const slug = [topic.slug, 'in', geo.slug];
  const title = `${topic.name} in ${geo.name} | QuickLeap`;
  const geoDescriptor =
    geo.kind === 'city' && geo.country ? `${geo.name} (${geo.country})` : geo.name;
  const description = `${geo.region ? `${geo.region} teams` : 'Teams'} rely on ${topic.name.toLowerCase()} that stays fast and measurable in ${geoDescriptor}.`;
  const h1 = `${topic.name} in ${geo.name}`;
  const intro =
    geo.kind === 'city'
      ? `Launch ${topic.name.toLowerCase()} workflows in ${geo.name} with dependable redirects, localized tracking, and fast routing.`
      : `Scale ${topic.name.toLowerCase()} across ${geo.name} with dependable redirects, consistent analytics, and governance.`;
  const sections = buildSections(topic, geoDescriptor, [
    `Support ${geo.region || 'regional'} traffic with consistent redirect latency.`,
    `Coordinate marketing, engineering, and SEO teams in ${geoDescriptor} with shared dashboards.`,
    'Avoid broken links as campaigns and domains evolve.',
  ]);
  const faqs = buildFaqs(topic, geo.name);

  return {
    template: 'location',
    slug,
    intentKey: `location:${topic.slug}:${geo.slug}`,
    title,
    h1,
    description,
    intro,
    sections,
    faqs,
    breadcrumbs: buildGeoBreadcrumbs(topic, geo),
    relatedLinks: related,
    meta: buildMeta(title, description, slug),
    updatedAt: new Date().toISOString(),
  };
};
