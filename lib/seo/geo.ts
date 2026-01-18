import { env } from '@/lib/env';

import type { GeoPlace } from './types';

type GeoDataset = {
  updatedAt: string;
  places: GeoPlace[];
};

const GEO_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

let cachedPlaces: GeoPlace[] | null = null;
let cachedAt = 0;
let inflight: Promise<GeoPlace[]> | null = null;

const sortByPopulation = (a: GeoPlace, b: GeoPlace): number =>
  (b.population || 0) - (a.population || 0) || a.name.localeCompare(b.name);

const sortByName = (a: GeoPlace, b: GeoPlace): number => a.name.localeCompare(b.name);

const loadGeoPlaces = async (): Promise<GeoPlace[]> => {
  if (!env.GEO_DATA_URL) {
    throw new Error('GEO_DATA_URL is not configured.');
  }

  const response = await fetch(env.GEO_DATA_URL, { next: { revalidate: 86400 } });

  if (!response.ok) {
    throw new Error(`Failed to fetch geo data: ${response.status}`);
  }

  const data = (await response.json()) as GeoDataset;
  const normalizedPlaces = (data.places || []).filter((place) => place && place.slug && place.name);
  const countries = normalizedPlaces.filter((place) => place.kind === 'country').sort(sortByName);
  const cities = normalizedPlaces.filter((place) => place.kind === 'city').sort(sortByPopulation);

  return [...countries, ...cities];
};

export const getGeoPlaces = async (): Promise<GeoPlace[]> => {
  if (cachedPlaces && Date.now() - cachedAt < GEO_CACHE_TTL_MS) {
    return cachedPlaces;
  }

  if (!inflight) {
    inflight = loadGeoPlaces();
  }

  try {
    const places = await inflight;
    cachedPlaces = places;
    cachedAt = Date.now();
    return places;
  } finally {
    inflight = null;
  }
};
