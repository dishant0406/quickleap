export type SeoTemplateKey = 'topic' | 'industry' | 'location';

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoSection = {
  heading: string;
  body: string[];
};

export type SeoBreadcrumb = {
  name: string;
  url: string;
};

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  noIndex?: boolean;
};

export type ProgrammaticLink = {
  label: string;
  href: string;
  intentKey: string;
};

export type ProgrammaticPage = {
  template: SeoTemplateKey;
  slug: string[];
  intentKey: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  sections: SeoSection[];
  faqs: SeoFaq[];
  breadcrumbs: SeoBreadcrumb[];
  relatedLinks: ProgrammaticLink[];
  meta: SeoMeta;
  updatedAt: string;
};

export type Topic = {
  slug: string;
  name: string;
  summary: string;
  intent: string;
  benefits: string[];
  proofPoint: string;
  industries: string[];
  locations: string[];
  featured?: boolean;
};

export type Industry = {
  slug: string;
  name: string;
  painPoint: string;
  outcomes: string[];
};

export type GeoPlace = {
  slug: string;
  name: string;
  kind: 'country' | 'city';
  region?: string;
  country?: string;
  localAngle?: string;
  population?: number;
};
