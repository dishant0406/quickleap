'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function BlogPostHeader(): React.JSX.Element {
  return (
    <div className="">
      <div className="container mx-auto px-4 pt-5 sm:px-6 lg:px-8">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-text/70 transition-colors hover:text-main"
          href="/blog"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    </div>
  );
}
