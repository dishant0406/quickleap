import { notFound } from 'next/navigation';

import {
  BlogPostContent,
  BlogPostCover,
  BlogPostFooter,
  BlogPostHeader,
  BlogPostMeta,
  DynamicSidebar,
  RelatedPosts,
} from '@/components/Blog';
import Footer from '@/components/Landing/components/Footer';
import { BlogPostSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { Badge } from '@/components/ui/badge';
import { fetchBlogPostBySlug, fetchBlogPostMetadata } from '@/lib/api/hashnode';
import { env } from '@/lib/env';

import type { Metadata } from 'next';

// Next.js 15: Use dynamic rendering with time-based revalidation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data
export const fetchCache = 'force-no-store';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const publicationHost = env.NEXT_PUBLIC_HASHNODE_HOST;
  const { slug } = await params;

  try {
    const response = await fetchBlogPostMetadata(publicationHost, slug);
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
    const canonicalUrl = `https://quickleap.io/blog/${slug}`;

    return {
      title: `${title} | QuickLeap Blog`,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: canonicalUrl,
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
  const { slug } = await params;

  let post;
  try {
    const response = await fetchBlogPostBySlug(publicationHost, slug);
    post = response.publication.post;

    if (!post) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', url: 'https://quickleap.io' },
    { name: 'Blog', url: 'https://quickleap.io/blog' },
    { name: post.title, url: `https://quickleap.io/blog/${slug}` },
  ];

  return (
    <>
      <BlogPostSchema
        authorName={post.author.name}
        authorUrl="https://quickleap.io"
        description={post.brief}
        imageUrl={post.coverImage?.url}
        publishedAt={post.publishedAt}
        title={post.title}
        url={`https://quickleap.io/blog/${slug}`}
      />

      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="relative h-main  mt-nav">
        {/* Header */}
        <BlogPostHeader />

        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <article className="min-w-0">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag.slug} className="hover:bg-muted">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="mb-8 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {/* Meta Section */}
              <div data-meta-section className="mb-10">
                <BlogPostMeta
                  author={post.author}
                  publishedAt={post.publishedAt}
                  readTimeInMinutes={post.readTimeInMinutes}
                />
              </div>

              {/* Cover Image */}
              {post.coverImage?.url && (
                <div data-cover-image className="mb-12">
                  <BlogPostCover title={post.title} url={post.coverImage.url} />
                </div>
              )}

              {/* Content */}
              <div className="mb-12">
                <BlogPostContent html={post.content.html} />
              </div>

              {/* Footer */}
              <BlogPostFooter />
            </article>

            {/* Related Posts Sidebar - dynamically positioned */}
            <DynamicSidebar>
              <RelatedPosts currentSlug={slug} />
            </DynamicSidebar>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
