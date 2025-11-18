import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
const HASHNODE_PAT = '2d092ab2-6e54-4111-9130-59805fa575e0';

// Create a new Apollo Client instance for each request (Next.js 15 compatible)
export function getClient(): ApolloClient {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: HASHNODE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        ...(HASHNODE_PAT && { Authorization: HASHNODE_PAT }),
      },
      // Disable default caching - let Next.js handle it
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    // Disable Apollo Client cache for SSR
    ssrMode: typeof window === 'undefined',
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
}
