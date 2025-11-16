'use client';

import Link from 'next/link';

export function BlogPostFooter(): React.JSX.Element {
  return (
    <div className="mt-16 border-t-2 border-border pt-8">
      <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-text/60">Enjoyed this article? Check out more posts.</p>
        <Link
          className="rounded-base border-2 border-border bg-main px-6 py-2.5 font-base text-sm text-mtext shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          href="/blog"
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
}
