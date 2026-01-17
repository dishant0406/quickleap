import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import type { ComponentConfig, PageConfig } from '@/components/DynamicPage/types';
import { BreadcrumbSchema, WebPageSchema } from '@/components/StructuredData';
import { env } from '@/lib/env';
import { getSolutionsHubCards, getSolutionsHubFeaturedLinks } from '@/lib/seo/registry';

import type { Metadata } from 'next';

export const revalidate = 86400;

const buildSolutionsPageConfig = (): PageConfig => {
  const cards = getSolutionsHubCards();
  const featuredLinks = getSolutionsHubFeaturedLinks();

  const cardComponents: ComponentConfig[] = cards.map((card, index) => ({
    id: `solution-card-${index}`,
    type: 'card',
    title: card.name,
    description: card.summary,
    shadow: true,
    hover: true,
    footer: [
      {
        id: `solution-card-btn-${index}`,
        type: 'button',
        text: 'Explore',
        variant: 'default',
        size: 'sm',
        href: `/solutions/${card.slug}`,
      },
    ],
  }));

  const featuredComponents: ComponentConfig[] = featuredLinks.map((link, index) => ({
    id: `featured-link-${index}`,
    type: 'card',
    title: link.label,
    description: 'Review the full solution summary and related use cases.',
    shadow: true,
    hover: true,
    footer: [
      {
        id: `featured-link-btn-${index}`,
        type: 'button',
        text: 'View hub',
        variant: 'default',
        size: 'sm',
        href: link.href,
      },
    ],
  }));

  return {
    title: 'Solutions Library | QuickLeap',
    description:
      'Explore redirect solutions by industry, location, and migration goal with intent-matched content and internal linking.',
    layout: {
      showNavbar: true,
      showFooter: true,
    },
    seo: {
      canonicalUrl: 'https://quickleap.io/solutions',
      keywords: ['solutions', 'redirects', 'domain forwarding', 'migration'],
    },
    components: [
      {
        id: 'hero',
        type: 'hero',
        title: 'Solutions Library',
        subtitle:
          'Find the right redirect approach for every migration, campaign, and expansion.',
        height: 'screen',
        backgroundPattern: true,
        badges: ['Solutions', 'Redirect Strategy'],
      },
      {
        id: 'solutions-section',
        type: 'section',
        title: 'Explore solution hubs',
        subtitle: 'Pick a hub to see tailored guidance by industry and location.',
        children: [
          {
            id: 'solutions-container',
            type: 'container',
            layout: 'contained',
            children: [
              {
                id: 'solutions-grid',
                type: 'grid',
                columns: { xs: 1, md: 2 },
                gap: 'lg',
                children: cardComponents,
              },
            ],
          },
        ],
      },
      {
        id: 'featured-section',
        type: 'section',
        title: 'Featured solution hubs',
        subtitle: 'Jump into high-demand redirect strategies.',
        background: 'muted',
        children: [
          {
            id: 'featured-container',
            type: 'container',
            layout: 'contained',
            children: [
              {
                id: 'featured-grid',
                type: 'grid',
                columns: { xs: 1, md: 2 },
                gap: 'lg',
                children: featuredComponents,
              },
            ],
          },
        ],
      },
    ],
  };
};

export const metadata: Metadata = generateMetadataFromConfig(buildSolutionsPageConfig());

export default function SolutionsHubPage(): React.JSX.Element {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';
  const config = buildSolutionsPageConfig();

  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Solutions', url: `${siteUrl}/solutions` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        description="Programmatic SEO hub for scalable redirect solutions."
        name="Solutions Library"
        siteName="QuickLeap"
        siteUrl={siteUrl}
        url={`${siteUrl}/solutions`}
      />
      <DynamicPage config={config} />
    </>
  );
}
