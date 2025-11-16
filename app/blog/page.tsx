import { BlogGrid } from '@/components/Blog';
import Footer from '@/components/Landing/components/Footer';
import { fetchBlogPosts } from '@/lib/api/hashnode';
import { env } from '@/lib/env';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | QuickLeap Redirects',
  description:
    'Discover insights, tutorials, and updates from our team. Stay up to date with the latest in tech, design, and innovation.',
  openGraph: {
    title: 'Blog | QuickLeap Redirects',
    description:
      'Discover insights, tutorials, and updates from our team. Stay up to date with the latest in tech, design, and innovation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | QuickLeap Redirects',
    description:
      'Discover insights, tutorials, and updates from our team. Stay up to date with the latest in tech, design, and innovation.',
  },
};

export default async function BlogPage(): Promise<React.JSX.Element> {
  const publicationHost = env.NEXT_PUBLIC_HASHNODE_HOST || 'blog.yourdomain.com';

  // Fetch initial posts on the server
  const response = await fetchBlogPosts(publicationHost, {
    first: 12,
  });

  const initialPosts = response.publication.posts.edges.map((edge) => edge.node);
  const pageInfo = response.publication.posts.pageInfo;

  return (
    <>
      <div className="h-main  mt-nav overflow-y-auto">
        <div className="container p-4 md:p-[5vh] md:px-[7vw] mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <h1 className="mb-3 text-2xl font-heading text-text sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
              Quick Blog
            </h1>
            <p className="mx-auto max-w-2xl md:text-base text-sm text-text/70">
              Discover insights, tutorials, and updates from our team. Stay up to date with the
              latest in tech, design, and innovation.
            </p>
          </div>

          {/* Blog Grid */}
          <BlogGrid
            endCursor={pageInfo.endCursor}
            hasNextPage={pageInfo.hasNextPage}
            initialPosts={initialPosts}
            publicationHost={publicationHost}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
