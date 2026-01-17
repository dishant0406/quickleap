import type {
  ComponentConfig,
  PageConfig,
  SectionConfig,
  AccordionConfig,
  HeroConfig,
} from '@/components/DynamicPage/types';
import { env } from '@/lib/env';

import type { ProgrammaticPage } from './types';

const buildSectionContent = (paragraphs: string[]): string => paragraphs.join('\n\n');

const buildRelatedSection = (page: ProgrammaticPage): SectionConfig => {
  const cards: ComponentConfig[] = page.relatedLinks.map((link, index) => ({
    id: `related-card-${index}`,
    type: 'card',
    title: link.label,
    description: 'Explore the full solution details and templates.',
    shadow: true,
    hover: true,
    footer: [
      {
        id: `related-btn-${index}`,
        type: 'button',
        text: 'View solution',
        variant: 'default',
        size: 'sm',
        href: link.href,
      },
    ],
  }));

  return {
    id: 'related-section',
    type: 'section',
    title: 'Related solutions',
    subtitle: 'Continue exploring high-intent redirect scenarios.',
    background: 'muted',
    children: [
      {
        id: 'related-container',
        type: 'container',
        layout: 'contained',
        children: [
          {
            id: 'related-grid',
            type: 'grid',
            columns: { xs: 1, md: 2 },
            gap: 'lg',
            children: cards,
          },
        ],
      },
    ],
  };
};

export const buildDynamicPageConfig = (page: ProgrammaticPage): PageConfig => {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';
  const canonicalUrl = `${siteUrl}${page.meta.canonicalPath}`;

  const hero: HeroConfig = {
    id: 'hero',
    type: 'hero',
    title: page.h1,
    subtitle: page.intro,
    badges: [page.template.toUpperCase(), page.intentKey],
    backgroundPattern: true,
  };

  const sections: ComponentConfig[] = page.sections.map((section, index) => ({
    id: `section-${index}`,
    type: 'section',
    title: section.heading,
    background: index % 2 === 0 ? 'default' : 'muted',
    children: [
      {
        id: `section-${index}-container`,
        type: 'container',
        layout: 'contained',
        children: [
          {
            id: `section-${index}-markdown`,
            type: 'markdown',
            content: buildSectionContent(section.body),
            size: 'lg',
          },
        ],
      },
    ],
  }));

  const faq: AccordionConfig = {
    id: 'faq-accordion',
    type: 'accordion',
    allowMultiple: true,
    items: page.faqs.map((faq) => ({
      title: faq.question,
      content: faq.answer,
    })),
  };

  const faqSection: SectionConfig = {
    id: 'faq-section',
    type: 'section',
    title: 'FAQs',
    background: 'pattern',
    children: [
      {
        id: 'faq-container',
        type: 'container',
        layout: 'contained',
        children: [faq],
      },
    ],
  };

  return {
    title: page.title,
    description: page.description,
    layout: {
      showNavbar: true,
      showFooter: true,
    },
    seo: {
      canonicalUrl,
      ogImage: page.meta.ogImage,
      keywords: [page.template, page.intentKey],
    },
    components: [hero, ...sections, faqSection, buildRelatedSection(page)],
  };
};
