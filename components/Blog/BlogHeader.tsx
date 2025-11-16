'use client';

import { Search } from 'lucide-react';

interface BlogHeaderProps {
  title?: string;
  description?: string;
  onSearch?: (query: string) => void;
}

export function BlogHeader({
  title = 'Our Blog',
  description = 'Discover insights, tutorials, and updates from our team.',
  onSearch,
}: BlogHeaderProps) {
  return (
    <div className="mb-12 text-center">
      {/* Icon */}
      <div className="mb-4 inline-flex items-center justify-center rounded-full border-2 border-border bg-main p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Search className="h-8 w-8 text-mtext" />
      </div>

      {/* Title */}
      <h1 className="mb-4 text-4xl font-heading text-text md:text-5xl lg:text-6xl">{title}</h1>

      {/* Description */}
      <p className="mx-auto mb-8 max-w-2xl text-lg text-text/70">{description}</p>

      {/* Search Bar (Optional) */}
      {onSearch && (
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <input
              className="w-full rounded-base border-2 border-border bg-bw px-4 py-3 pl-12 font-base text-text shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="Search blog posts..."
              type="text"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text/50" />
          </div>
        </div>
      )}
    </div>
  );
}
