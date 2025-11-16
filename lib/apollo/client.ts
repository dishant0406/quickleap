import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
const HASHNODE_PAT = '2d092ab2-6e54-4111-9130-59805fa575e0';

// Create a singleton Apollo Client instance
let client: ApolloClient | null = null;

export function getClient(): ApolloClient {
  // Create client if it doesn't exist or if we're on the server
  if (!client || typeof window === 'undefined') {
    client = new ApolloClient({
      cache: new InMemoryCache({
        resultCaching: false, // Disable result caching
      }),
      link: new HttpLink({
        uri: HASHNODE_API_URL,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          ...(HASHNODE_PAT && { Authorization: HASHNODE_PAT }),
        },
        // Disable result caching for SSR
        fetchOptions: {
          cache: 'no-store',
          next: { revalidate: 0 }, // Next.js specific - always revalidate
        },
      }),
    });
  }

  return client;
}
