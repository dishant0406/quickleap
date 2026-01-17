import { env } from '@/lib/env';

import type { Metadata, SeoMeta } from './types';

const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';

export const buildSeoMetadata = (meta: SeoMeta): Metadata => {
  const canonical = `${siteUrl}${meta.canonicalPath}`;
  const title = meta.title;
  const description = meta.description;
  const image = meta.ogImage || 'https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/og.png';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(meta.noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
};
