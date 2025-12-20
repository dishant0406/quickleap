import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchBlogPosts } from '@/lib/api/hashnode';
import { env } from '@/lib/env';

interface RelatedPostsProps {
  currentSlug: string;
}

export async function RelatedPosts({
  currentSlug,
}: RelatedPostsProps): Promise<React.JSX.Element | null> {
  try {
    const publicationHost = env.NEXT_PUBLIC_HASHNODE_HOST || 'blog.yourdomain.com';

    // Fetch recent posts
    const response = await fetchBlogPosts(publicationHost, { first: 15 });
    const allPosts = response.publication.posts.edges.map((edge) => edge.node);

    // Filter out current post and get top 5
    const filteredPosts = allPosts.filter((post) => post.slug !== currentSlug).slice(0, 5);

    if (filteredPosts.length === 0) {
      return null;
    }

    return (
      <Card className="border-2 border-border bg-bg shadow-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-text">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link
                className="block rounded-base p-3 transition-all hover:bg-main/10 hover:shadow-sm"
                href={`/blog/${post.slug}`}
              >
                <h3 className="text-sm font-base text-text line-clamp-2 group-hover:underline-offset-4 group-hover:decoration-dashed group-hover:underline transition-colors">
                  {post.title}
                </h3>
              </Link>
            </article>
          ))}

          <div className="pt-4 border-t border-border">
            <Link className="block text-center text-sm font-base transition-colors" href="/blog">
              View All Posts →
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return null;
  }
}
