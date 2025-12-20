import { BlogGrid, SEOPagination } from '@/components/Blog';
import Footer from '@/components/Landing/components/Footer';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { fetchBlogPostsForPage } from '@/lib/api/hashnode';
import { env } from '@/lib/env';

import type { Metadata } from 'next';

// Next.js 15: Use dynamic rendering with time-based revalidation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data
export const fetchCache = 'force-no-store';

const POSTS_PER_PAGE = 9; // Display 9 posts per page

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate metadata with pagination support
export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = Math.max(1, parseInt((params.page as string) || '1', 10));

  const title =
    page > 1 ? `Blog - Page ${page} | QuickLeap Redirects` : 'Blog | QuickLeap Redirects';
  const description =
    'Discover insights, tutorials, and updates from our team. Stay up to date with the latest in tech, design, and innovation.';
  const canonical =
    page > 1 ? `https://quickleap.io/blog?page=${page}` : 'https://quickleap.io/blog';

  // Build alternates for pagination
  const alternates: Record<string, string> = { canonical };

  // Add next/prev links for pagination SEO
  if (page > 1) {
    alternates.prev =
      page === 2 ? 'https://quickleap.io/blog' : `https://quickleap.io/blog?page=${page - 1}`;
  }

  // We'll check if there's a next page by attempting to fetch it
  // For now, we'll add it conditionally in the component

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      noarchive: page > 1, // Don't archive paginated pages
    },
  };
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps): Promise<React.JSX.Element> {
  const params = await searchParams;
  const page = Math.max(1, parseInt((params.page as string) || '1', 10));
  const publicationHost = env.NEXT_PUBLIC_HASHNODE_HOST || 'blog.yourdomain.com';

  // Fetch posts for the current page using the optimized function
  const paginationData = await fetchBlogPostsForPage(publicationHost, page, POSTS_PER_PAGE);
  const { posts: currentPagePosts, totalPages } = paginationData;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://quickleap.io' },
          { name: 'Blog', url: 'https://quickleap.io/blog' },
        ]}
      />
      <SEOPagination
        baseUrl="https://quickleap.io/blog"
        currentPage={page}
        totalPages={totalPages}
      />
      <div className="h-main  mt-nav overflow-y-auto">
        <div className="container p-4 md:p-[5vh] md:px-[7vw] mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <h1 className="mb-3 text-2xl font-heading text-text sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
              Quick Blog {page > 1 && <span className="text-text/70">- Page {page}</span>}
            </h1>
            <p className="mx-auto max-w-2xl md:text-base text-sm text-text/70">
              Discover insights, tutorials, and updates from our team. Stay up to date with the
              latest in tech, design, and innovation.
            </p>
          </div>

          {/* Blog Grid */}
          <BlogGrid currentPage={page} initialPosts={currentPagePosts} totalPages={totalPages} />
        </div>
        <Footer />
      </div>
    </>
  );
}
