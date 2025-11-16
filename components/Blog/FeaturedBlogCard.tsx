'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types/blog';

interface FeaturedBlogCardProps {
  post: BlogPost;
  imagePosition?: 'left' | 'right';
}

export function FeaturedBlogCard({
  post,
  imagePosition = 'left',
}: FeaturedBlogCardProps): React.JSX.Element {
  const formattedDate = format(new Date(post.publishedAt), 'MMM do, yyyy');
  const category = post.tags?.[0]?.name || 'New Feature';

  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className={`group relative flex flex-col overflow-hidden md:flex-row ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Cover Image */}
        {post.coverImage?.url && (
          <div className="relative aspect-[16/9] border-4 border-border rounded-[20px] w-full overflow-hidden md:w-[60%]">
            <Image
              fill
              alt={post.title}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
              src={post.coverImage.url}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1  flex-col justify-center gap-4 p-6 sm:gap-5 sm:p-8 md:w-[40%] lg:gap-6 lg:p-10">
          {/* Meta Info - Date and Category */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-base text-text/60">{formattedDate}</span>
            <span className="text-text/40">|</span>
            <Badge className="border-0 bg-bw px-3 py-1 text-sm font-base text-text">
              {category}
            </Badge>
          </div>

          {/* Title */}
          <h2 className="line-clamp-2 text-2xl font-heading leading-tight text-text transition-colors sm:text-3xl lg:text-4xl">
            {post.title}
          </h2>

          {/* Brief/Description */}
          <p className="line-clamp-3 text-base leading-relaxed text-text/70 sm:line-clamp-4 sm:text-lg">
            {post.brief}
          </p>

          {/* Author Info */}
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.profilePicture && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-border">
                  <Image
                    fill
                    alt={post.author.name}
                    className="object-cover"
                    src={post.author.profilePicture}
                  />
                </div>
              )}
              <span className="font-base text-sm text-text">{post.author.name}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
