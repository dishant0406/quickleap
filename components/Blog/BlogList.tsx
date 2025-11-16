'use client';

import { useState } from 'react';

import { fetchBlogPosts } from '@/lib/api/hashnode';
import type { BlogPost } from '@/lib/types/blog';

import { BlogCard } from './BlogCard';
import { FeaturedBlogCard } from './FeaturedBlogCard';

interface BlogGridProps {
  initialPosts: BlogPost[];
  publicationHost: string;
  hasNextPage: boolean;
  endCursor: string;
}

export function BlogGrid({
  initialPosts,
  publicationHost,
  hasNextPage: initialHasNextPage,
  endCursor: initialEndCursor,
}: BlogGridProps): React.JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasNextPage);
  const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMorePosts = async (): Promise<void> => {
    if (!endCursor || loadingMore) return;

    try {
      setLoadingMore(true);

      const response = await fetchBlogPosts(publicationHost, {
        first: 12,
        after: endCursor,
      });

      const fetchedPosts = response.publication.posts.edges.map((edge) => edge.node);
      const pageInfo = response.publication.posts.pageInfo;

      setPosts((prev) => [...prev, ...fetchedPosts]);
      setHasMore(pageInfo.hasNextPage);
      setEndCursor(pageInfo.endCursor);
    } catch (err) {
      console.error('Error loading more posts:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-base border-2 border-border bg-bw p-8 text-center shadow-shadow">
        <h3 className="mb-2 text-xl font-heading text-text">No Posts Found</h3>
        <p className="text-text/70">Check back later for new content!</p>
      </div>
    );
  }

  // Split posts into featured (first 2) and regular posts
  const featuredPosts = posts.slice(0, 2);
  const regularPosts = posts;

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

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            className="rounded-base border-2 border-border bg-main px-6 py-2.5 font-base text-sm text-mtext shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3 sm:text-base"
            disabled={loadingMore}
            onClick={loadMorePosts}
          >
            {loadingMore ? 'Loading...' : 'Load More Posts'}
          </button>
        </div>
      )}
    </div>
  );
}
