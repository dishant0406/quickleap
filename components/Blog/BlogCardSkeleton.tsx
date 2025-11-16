'use client';

export function BlogCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-base border-2 border-border bg-bw shadow-shadow">
      {/* Cover Image Skeleton */}
      <div className="aspect-video w-full animate-pulse bg-text/10 border-b-2 border-border" />

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-4/5 animate-pulse rounded bg-text/10" />
          <div className="h-6 w-2/3 animate-pulse rounded bg-text/10" />
        </div>

        {/* Brief Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-text/10" />
          <div className="h-4 w-full animate-pulse rounded bg-text/10" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-text/10" />
        </div>

        {/* Meta Information Skeleton */}
        <div className="flex gap-3">
          <div className="h-4 w-20 animate-pulse rounded bg-text/10" />
          <div className="h-4 w-20 animate-pulse rounded bg-text/10" />
          <div className="h-4 w-16 animate-pulse rounded bg-text/10" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-auto flex items-center justify-between border-t-2 border-border pt-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-pulse rounded-full border-2 border-border bg-text/10" />
            <div className="h-4 w-24 animate-pulse rounded bg-text/10" />
          </div>
          <div className="flex gap-3">
            <div className="h-4 w-8 animate-pulse rounded bg-text/10" />
            <div className="h-4 w-8 animate-pulse rounded bg-text/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
