'use client';

import Image from 'next/image';

interface BlogPostCoverProps {
  url: string;
  title: string;
}

export function BlogPostCover({ url, title }: BlogPostCoverProps): React.JSX.Element {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-border shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <Image fill priority alt={title} className="object-cover" sizes="1200px" src={url} />
    </div>
  );
}
