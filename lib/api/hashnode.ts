import { gql } from '@apollo/client';

import { getClient } from '../apollo/client';
import type { BlogPostDetailResponse, BlogPostsParams, BlogPostsResponse } from '../types/blog';

/**
 * GraphQL query to fetch blog posts from a publication
 */
const GET_PUBLICATION_POSTS_QUERY = gql`
  query GetPublicationPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      title
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            slug
            title
            brief
            url
            coverImage {
              url
              isPortrait
              attribution
            }
            publishedAt
            readTimeInMinutes
            views
            author {
              name
              username
              profilePicture
            }
            tags {
              name
              slug
            }
            seo {
              title
              description
            }
            ogMetaData {
              image
            }
            reactionCount
            responseCount
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

/**
 * Fetch blog posts from Hashnode publication
 * @param host - The publication hostname (e.g., 'blog.yourdomain.com' or 'yourusername.hashnode.dev')
 * @param params - Pagination parameters
 * @returns Promise with blog posts data
 */
export async function fetchBlogPosts(
  host: string,
  params: BlogPostsParams = { first: 10 }
): Promise<BlogPostsResponse> {
  try {
    const client = getClient();
    const { data } = await client.query<BlogPostsResponse>({
      query: GET_PUBLICATION_POSTS_QUERY,
      variables: {
        host,
        first: params.first || 10,
        after: params.after || null,
      },
      context: {
        fetchOptions: {
          next: { revalidate: 600 }, // Cache for 1 hour
        },
      },
    });

    if (!data) {
      throw new Error('No data returned from query');
    }

    return data;
  } catch (error) {
    console.error('Hashnode API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch blog posts: ${errorMessage}`);
  }
}

/**
 * Fetch a single blog post by slug
 */
const GET_POST_BY_SLUG_QUERY = gql`
  query GetPostBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        slug
        title
        brief
        url
        coverImage {
          url
          isPortrait
          attribution
        }
        content {
          markdown
          html
        }
        publishedAt
        readTimeInMinutes
        views
        author {
          name
          username
          profilePicture
          bio {
            text
          }
        }
        tags {
          name
          slug
        }
        seo {
          title
          description
        }
        ogMetaData {
          image
        }
        reactionCount
        responseCount
      }
    }
  }
`;

export async function fetchBlogPostBySlug(
  host: string,
  slug: string
): Promise<BlogPostDetailResponse> {
  try {
    const client = getClient();
    const { data } = await client.query<BlogPostDetailResponse>({
      query: GET_POST_BY_SLUG_QUERY,
      variables: {
        host,
        slug,
      },
      context: {
        fetchOptions: {
          next: { revalidate: 600 }, // Cache for 1 hour
        },
      },
    });

    if (!data) {
      throw new Error('No data returned from query');
    }

    return data;
  } catch (error) {
    console.error('Hashnode API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch blog post: ${errorMessage}`);
  }
}

/**
 * Fetch minimal blog post metadata for SEO (lightweight version)
 */
const GET_POST_METADATA_QUERY = gql`
  query GetPostMetadata($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        title
        brief
        publishedAt
        author {
          name
        }
        coverImage {
          url
        }
        seo {
          title
          description
        }
        ogMetaData {
          image
        }
      }
    }
  }
`;

export async function fetchBlogPostMetadata(
  host: string,
  slug: string
): Promise<BlogPostDetailResponse> {
  try {
    const client = getClient();
    const { data } = await client.query<BlogPostDetailResponse>({
      query: GET_POST_METADATA_QUERY,
      variables: {
        host,
        slug,
      },
      context: {
        fetchOptions: {
          next: { revalidate: 600 }, // Cache for 1 hour
        },
      },
    });

    if (!data) {
      throw new Error('No data returned from query');
    }

    return data;
  } catch (error) {
    console.error('Hashnode API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch blog post metadata: ${errorMessage}`);
  }
}

/**
 * Lightweight query for sitemap - only fetches slug and publishedAt
 */
const GET_POSTS_FOR_SITEMAP_QUERY = gql`
  query GetPostsForSitemap($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        edges {
          node {
            slug
            publishedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export async function fetchBlogPostsForSitemap(
  host: string,
  params: BlogPostsParams = { first: 50 }
): Promise<BlogPostsResponse> {
  try {
    const client = getClient();
    const { data } = await client.query<BlogPostsResponse>({
      query: GET_POSTS_FOR_SITEMAP_QUERY,
      variables: {
        host,
        first: params.first || 50,
        after: params.after || null,
      },
      context: {
        fetchOptions: {
          next: { revalidate: 600 }, // Cache for 1 hour
        },
      },
    });

    if (!data) {
      throw new Error('No data returned from query');
    }

    return data;
  } catch (error) {
    console.error('Hashnode API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch blog posts for sitemap: ${errorMessage}`);
  }
}
