import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = path.resolve(__dirname, '../lib/seo/geo.json');
const COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=name,cca2,region,subregion';
const CITY_DATASET =
  'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records';
const MAX_CITIES_PER_COUNTRY = 500;
const CITY_PAGE_SIZE = 100;

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed request ${url}: ${response.status}`);
  }
  return response.json();
};

const buildGeoDataset = async () => {
  const countries = await fetchJson(COUNTRIES_URL);
  if (!Array.isArray(countries)) {
    throw new Error('Unexpected response shape from countries API.');
  }

  const places = [];

  countries.forEach((country) => {
    const countryName = country?.name?.common;
    if (!countryName) {
      return;
    }
    const countrySlug = slugify(countryName);
    places.push({
      slug: countrySlug,
      name: countryName,
      kind: 'country',
      region: country.region || country.subregion || 'Global',
      population: country.population || undefined,
    });
  });

  for (const country of countries) {
    const countryCode = country?.cca2;
    const countryName = country?.name?.common;
    if (!countryCode || !countryName) {
      continue;
    }

    let fetchedForCountry = 0;
    let offset = 0;

    while (fetchedForCountry < MAX_CITIES_PER_COUNTRY) {
      const remaining = MAX_CITIES_PER_COUNTRY - fetchedForCountry;
      const limit = Math.min(CITY_PAGE_SIZE, remaining);
      const url = `${CITY_DATASET}?limit=${limit}&offset=${offset}&order_by=-population&where=country_code%3D%22${countryCode}%22`;
      const response = await fetchJson(url);

      if (!response?.results?.length) {
        break;
      }

      response.results.forEach((city) => {
        const cityName = city.name;
        if (!cityName) {
          return;
        }
        const citySlug = slugify(cityName);
        const countrySlug = slugify(countryName);
        if (!citySlug || !countrySlug) {
          return;
        }
        places.push({
          slug: `${citySlug}-${countrySlug}`,
          name: `${cityName}, ${countryName}`,
          kind: 'city',
          region: country.region || country.subregion || 'Global',
          country: countryName,
          population: typeof city.population === 'number' ? city.population : undefined,
        });
      });

      fetchedForCountry += response.results.length;
      offset += limit;
    }
  }

  const unique = new Map();
  places.forEach((place) => {
    if (!unique.has(place.slug)) {
      unique.set(place.slug, place);
    }
  });

  return {
    updatedAt: new Date().toISOString(),
    places: Array.from(unique.values()).sort((a, b) => a.slug.localeCompare(b.slug)),
  };
};

const main = async () => {
  const dataset = await buildGeoDataset();
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(dataset, null, 2));
  console.log(`Wrote ${dataset.places.length} places to ${OUTPUT_PATH}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
