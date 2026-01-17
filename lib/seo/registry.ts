import { buildGeoPage, buildIndustryPage, buildTopicHubPage } from './content';
import { industries, topics } from './data';
import { getGeoPlaces } from './geo';
import {
  buildIndustryRelatedLinks,
  buildLocationRelatedLinks,
  buildTopicRelatedLinks,
} from './links';
import { validateProgrammaticPage } from './quality';

import type { ProgrammaticPage } from './types';

const PROGRAMMATIC_TARGET_PAGE_COUNT = 250000;
const GEO_PATH_SEGMENT = 'in';

const topicLookup = new Map(topics.map((topic) => [topic.slug, topic]));
const industryLookup = new Map(industries.map((industry) => [industry.slug, industry]));

const geoPlaces = getGeoPlaces();

export const baseSolutionsPath = '/solutions';

const hubCount = topics.length;
const industryCount = topics.length * industries.length;
const baseCount = hubCount + industryCount;

const maxGeoPerTopic = Math.max(
  0,
  Math.floor((PROGRAMMATIC_TARGET_PAGE_COUNT - baseCount) / Math.max(1, topics.length))
);
const programmaticGeoPlaces = geoPlaces.slice(0, maxGeoPerTopic);
const programmaticGeoLookup = new Map(programmaticGeoPlaces.map((place) => [place.slug, place]));
const locationCount = topics.length * programmaticGeoPlaces.length;

export const getProgrammaticPathCount = (): number => hubCount + industryCount + locationCount;

export const getProgrammaticPathByIndex = (index: number): string | null => {
  if (index < 0 || index >= getProgrammaticPathCount()) {
    return null;
  }

  if (index < hubCount) {
    return `/solutions/${topics[index].slug}`;
  }

  if (index < hubCount + industryCount) {
    const offset = index - hubCount;
    const topicIndex = Math.floor(offset / industries.length);
    const industryIndex = offset % industries.length;
    return `/solutions/${topics[topicIndex].slug}/${industries[industryIndex].slug}`;
  }

  if (programmaticGeoPlaces.length === 0) {
    return null;
  }

  const offset = index - hubCount - industryCount;
  const topicIndex = Math.floor(offset / programmaticGeoPlaces.length);
  const locationIndex = offset % programmaticGeoPlaces.length;
  return `/solutions/${topics[topicIndex].slug}/${GEO_PATH_SEGMENT}/${programmaticGeoPlaces[locationIndex].slug}`;
};

export const getProgrammaticPathsChunk = (pageIndex: number, size: number): string[] => {
  const start = pageIndex * size;
  const end = Math.min(start + size, getProgrammaticPathCount());
  const paths: string[] = [];

  for (let i = start; i < end; i += 1) {
    const path = getProgrammaticPathByIndex(i);
    if (path) {
      paths.push(path);
    }
  }

  return paths;
};

export const isProgrammaticPathValid = (path: string): boolean => {
  const cleaned = path.replace(/^\//, '');
  const segments = cleaned.split('/');

  if (segments[0] !== baseSolutionsPath.replace(/^\//, '')) {
    return false;
  }

  const slug = segments.slice(1);

  if (slug.length === 1) {
    return topicLookup.has(slug[0]);
  }

  if (slug.length === 2) {
    const [topicSlug, industrySlug] = slug;
    return topicLookup.has(topicSlug) && industryLookup.has(industrySlug);
  }

  if (slug.length === 3 && slug[1] === GEO_PATH_SEGMENT) {
    const [topicSlug, , geoSlug] = slug;
    return topicLookup.has(topicSlug) && programmaticGeoLookup.has(geoSlug);
  }

  return false;
};

export const getProgrammaticPage = (slug: string[]): ProgrammaticPage | null => {
  if (slug.length === 1) {
    const topic = topicLookup.get(slug[0]);
    if (!topic) {
      return null;
    }
    const related = buildTopicRelatedLinks(topic, industries, programmaticGeoPlaces);
    const page = buildTopicHubPage(topic, related);
    validateProgrammaticPage(page);
    return page;
  }

  if (slug.length === 2) {
    const [topicSlug, modifierSlug] = slug;
    const topic = topicLookup.get(topicSlug);
    if (!topic) {
      return null;
    }

    const industry = industryLookup.get(modifierSlug);
    if (industry) {
      const related = buildIndustryRelatedLinks(topic, industry, industries);
      const page = buildIndustryPage(topic, industry, related);
      validateProgrammaticPage(page);
      return page;
    }
  }

  if (slug.length === 3 && slug[1] === GEO_PATH_SEGMENT) {
    const [topicSlug, , geoSlug] = slug;
    const topic = topicLookup.get(topicSlug);
    if (!topic) {
      return null;
    }

    const geo = programmaticGeoLookup.get(geoSlug);
    if (geo) {
      const related = buildLocationRelatedLinks(topic, geo, programmaticGeoPlaces);
      const page = buildGeoPage(topic, geo, related);
      validateProgrammaticPage(page);
      return page;
    }
  }

  return null;
};

export const getProgrammaticStaticParams = (): Array<{ slug: string[] }> => {
  const featuredTopics = topics.filter((topic) => topic.featured);
  const params: Array<{ slug: string[] }> = [];

  featuredTopics.forEach((topic) => {
    params.push({ slug: [topic.slug] });

    topic.industries.slice(0, 2).forEach((industrySlug) => {
      params.push({ slug: [topic.slug, industrySlug] });
    });

    topic.locations.slice(0, 2).forEach((locationSlug) => {
      if (programmaticGeoLookup.has(locationSlug)) {
        params.push({ slug: [topic.slug, GEO_PATH_SEGMENT, locationSlug] });
      }
    });
  });

  return params;
};

export const getSolutionsHubCards = (): Array<{ slug: string; name: string; summary: string }> =>
  topics.map((topic) => ({
    slug: topic.slug,
    name: topic.name,
    summary: topic.summary,
  }));

export const getSolutionsHubFeaturedLinks = (): Array<{ label: string; href: string }> =>
  topics.map((topic) => ({
    label: `${topic.name} overview`,
    href: `/solutions/${topic.slug}`,
  }));
