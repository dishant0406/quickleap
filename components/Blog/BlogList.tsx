'use client';

import type { BlogPost } from '@/lib/types/blog';

import { BlogCard } from './BlogCard';
import { BlogPagination } from './BlogPagination';
import { FeaturedBlogCard } from './FeaturedBlogCard';

interface BlogGridProps {
  initialPosts: BlogPost[];
  currentPage: number;
  totalPages: number;
}

export function BlogGrid({
  initialPosts,
  currentPage,
  totalPages,
}: BlogGridProps): React.JSX.Element {
  if (initialPosts.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-base border-2 border-border bg-bw p-8 text-center shadow-shadow">
        <h3 className="mb-2 text-xl font-heading text-text">No Posts Found</h3>
        <p className="text-text/70">Check back later for new content!</p>
      </div>
    );
  }

  // Split posts into featured (first 2 for page 1 only) and regular posts
  const featuredPosts = currentPage === 1 ? initialPosts.slice(0, 2) : [];
  const regularPosts = currentPage === 1 ? initialPosts : initialPosts;

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* Featured Blog Posts */}
      {featuredPosts.length > 0 && (
        <div className="flex flex-col md:gap-[15vh] md:mb-[15vh]">
          {featuredPosts.map((post, index) => (
            <FeaturedBlogCard
              key={post.id}
              imagePosition={index === 0 ? 'left' : 'right'}
              post={post}
            />
          ))}
        </div>
      )}

      {/* Regular Blog Grid */}
      {regularPosts.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {regularPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
