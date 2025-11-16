'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps): React.JSX.Element {
  const formattedDate = format(new Date(post.publishedAt), 'MMM do, yyyy');
  const category = post.tags?.[0]?.name || 'Article';

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group relative h-full overflow-hidden">
        {/* Cover Image */}
        {post.coverImage?.url && (
          <div className="relative aspect-[16/10] rounded-[20px] w-full overflow-hidden border-2 border-border">
            <Image
              fill
              alt={post.title}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={post.coverImage.url}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative flex flex-col gap-3 p-2 sm:p-3">
          {/* Meta Info - Date and Category */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="font-base text-text/60">{formattedDate}</span>
            <span className="text-text/40">|</span>
            <Badge className="border-0 bg-main/10 px-2 py-0.5 text-xs font-base text-mtext">
              {category}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-lg font-heading leading-tight text-text transition-colors sm:text-xl">
            {post.title}
          </h3>

          {/* Brief/Description */}
          <p className="line-clamp-3 text-sm leading-relaxed text-text/70 sm:text-base">
            {post.brief}
          </p>
        </div>
      </article>
    </Link>
  );
}
