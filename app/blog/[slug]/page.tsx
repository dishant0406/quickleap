import { notFound } from 'next/navigation';

import {
  BlogPostContent,
  BlogPostCover,
  BlogPostFooter,
  BlogPostHeader,
  BlogPostMeta,
} from '@/components/Blog';
import Footer from '@/components/Landing/components/Footer';
import { Badge } from '@/components/ui/badge';
import { fetchBlogPostBySlug, fetchBlogPostMetadata } from '@/lib/api/hashnode';
import { env } from '@/lib/env';

import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const publicationHost = env.NEXT_PUBLIC_HASHNODE_HOST;

  try {
    const response = await fetchBlogPostMetadata(publicationHost, params.slug);
    const post = response.publication.post;

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    // Use SEO fields if available, fallback to post data
    const title = post.seo?.title || post.title;
    const description = post.seo?.description || post.brief;
    const image = post.ogMetaData?.image || post.coverImage?.url;

    return {
      title: `${title} | QuickLeap Blog`,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
        ...(image && {
          images: [
            {
              url: image,
              alt: title,
            },
          ],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(image && {
          images: [image],
        }),
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | QuickLeap',
      description: 'Read our latest blog post.',
    };
  }
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.JSX.Element> {
  const publicationHost = env.NEXT_PUBLIC_HASHNODE_HOST || 'blog.yourdomain.com';

  let post;
  try {
    const response = await fetchBlogPostBySlug(publicationHost, params.slug);
    post = response.publication.post;

    if (!post) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  return (
    <div className="h-main mt-nav overflow-y-auto bg-bg">
      <BlogPostHeader />

      <article className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag.slug}>{tag.name}</Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-6 text-3xl font-heading leading-tight text-text sm:text-4xl md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mb-8">
            <BlogPostMeta
              author={post.author}
              publishedAt={post.publishedAt}
              readTimeInMinutes={post.readTimeInMinutes}
            />
          </div>

          {/* Cover Image */}
          {post.coverImage?.url && (
            <div className="mb-10">
              <BlogPostCover title={post.title} url={post.coverImage.url} />
            </div>
          )}

          {/* Article Content */}
          <div className="mb-8">
            <BlogPostContent html={post.content.html} />
          </div>

          {/* Footer */}
          <BlogPostFooter />
        </div>
      </article>
      <Footer />
    </div>
  );
}
