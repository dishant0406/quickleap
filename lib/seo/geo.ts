import geoData from './geo.json';

import type { GeoPlace } from './types';

type GeoDataset = {
  updatedAt: string;
  places: GeoPlace[];
};

const normalizedPlaces = (geoData as GeoDataset).places.filter(
  (place) => place && place.slug && place.name
);

const sortByPopulation = (a: GeoPlace, b: GeoPlace): number =>
  (b.population || 0) - (a.population || 0) || a.name.localeCompare(b.name);

const sortByName = (a: GeoPlace, b: GeoPlace): number => a.name.localeCompare(b.name);

const countries = normalizedPlaces.filter((place) => place.kind === 'country').sort(sortByName);
const cities = normalizedPlaces.filter((place) => place.kind === 'city').sort(sortByPopulation);

export const getGeoPlaces = (): GeoPlace[] => [...countries, ...cities];
