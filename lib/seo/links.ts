import type { GeoPlace, Industry, ProgrammaticLink, Topic } from './types';

type LinkInput = {
  label: string;
  slug: string[];
  intentKey: string;
};

const toLinks = (inputs: LinkInput[]): ProgrammaticLink[] =>
  inputs.map((input) => ({
    label: input.label,
    href: `/solutions/${input.slug.join('/')}`,
    intentKey: input.intentKey,
  }));

export const buildTopicRelatedLinks = (
  topic: Topic,
  industries: Industry[],
  locations: GeoPlace[]
): ProgrammaticLink[] => {
  const industryLinks = industries.slice(0, 4).map((industry) => ({
    label: `${topic.name} for ${industry.name}`,
    slug: [topic.slug, industry.slug],
    intentKey: `industry:${topic.slug}:${industry.slug}`,
  }));

  const locationLinks = locations.slice(0, 4).map((location) => ({
    label: `${topic.name} in ${location.name}`,
    slug: [topic.slug, 'in', location.slug],
    intentKey: `location:${topic.slug}:${location.slug}`,
  }));

  return toLinks([...industryLinks, ...locationLinks]);
};

export const buildIndustryRelatedLinks = (
  topic: Topic,
  industry: Industry,
  industries: Industry[]
): ProgrammaticLink[] => {
  const hubLink = {
    label: `${topic.name} overview`,
    slug: [topic.slug],
    intentKey: `topic:${topic.slug}`,
  };

  const peerLinks = industries
    .filter((item) => item.slug !== industry.slug)
    .slice(0, 4)
    .map((item) => ({
      label: `${topic.name} for ${item.name}`,
      slug: [topic.slug, item.slug],
      intentKey: `industry:${topic.slug}:${item.slug}`,
    }));

  return toLinks([hubLink, ...peerLinks]);
};

export const buildLocationRelatedLinks = (
  topic: Topic,
  location: GeoPlace,
  locations: GeoPlace[]
): ProgrammaticLink[] => {
  const hubLink = {
    label: `${topic.name} overview`,
    slug: [topic.slug],
    intentKey: `topic:${topic.slug}`,
  };

  const peerLinks = locations
    .filter((item) => item.slug !== location.slug)
    .slice(0, 4)
    .map((item) => ({
      label: `${topic.name} in ${item.name}`,
      slug: [topic.slug, 'in', item.slug],
      intentKey: `location:${topic.slug}:${item.slug}`,
    }));

  return toLinks([hubLink, ...peerLinks]);
};
