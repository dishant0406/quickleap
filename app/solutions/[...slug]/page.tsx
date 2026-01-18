import { notFound } from 'next/navigation';

import { DynamicPage, generateMetadataFromConfig } from '@/components/DynamicPage';
import { BreadcrumbSchema, FAQSchema, WebPageSchema } from '@/components/StructuredData';
import { env } from '@/lib/env';
import { buildDynamicPageConfig } from '@/lib/seo/dynamic';
import { getProgrammaticPage, getProgrammaticStaticParams } from '@/lib/seo/registry';

import type { Metadata } from 'next';

export const revalidate = 86400;
export const dynamicParams = true;

interface ProgrammaticPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: ProgrammaticPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getProgrammaticPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const config = buildDynamicPageConfig(page);
  return generateMetadataFromConfig(config);
}

export async function generateStaticParams(): Promise<Array<{ slug: string[] }>> {
  return getProgrammaticStaticParams();
}

export default async function ProgrammaticSolutionsPage({
  params,
}: ProgrammaticPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const page = await getProgrammaticPage(slug);

  if (!page) {
    notFound();
  }

  const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io';
  const canonicalUrl = `${siteUrl}${page.meta.canonicalPath}`;
  const config = buildDynamicPageConfig(page);

  return (
    <>
      <BreadcrumbSchema items={page.breadcrumbs} />
      <FAQSchema faqs={page.faqs} />
      <WebPageSchema
        description={page.description}
        imageUrl={page.meta.ogImage}
        name={page.title}
        siteName="QuickLeap"
        siteUrl={siteUrl}
        url={canonicalUrl}
      />
      <DynamicPage config={config} />
    </>
  );
}
