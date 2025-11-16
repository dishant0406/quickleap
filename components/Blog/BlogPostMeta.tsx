'use client';

import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';

interface BlogPostMetaProps {
  author: {
    name: string;
    username: string;
    profilePicture?: string;
  };
  publishedAt: string;
  readTimeInMinutes: number;
}

export function BlogPostMeta({
  author,
  publishedAt,
  readTimeInMinutes,
}: BlogPostMetaProps): React.JSX.Element {
  const formattedDate = format(new Date(publishedAt), 'MMM do, yyyy');

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-text/60">
      {/* Author */}
      <div className="flex items-center gap-2">
        {author.profilePicture ? (
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
            <Image fill alt={author.name} className="object-cover" src={author.profilePicture} />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-main/10 text-xs font-bold text-main">
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="font-medium text-text">{author.name}</span>
      </div>

      <span className="text-border">•</span>

      {/* Date */}
      <div className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        <span>{formattedDate}</span>
      </div>

      <span className="text-border">•</span>

      {/* Read Time */}
      <div className="flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        <span>{readTimeInMinutes} min read</span>
      </div>
    </div>
  );
}
