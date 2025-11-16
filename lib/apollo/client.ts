import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
const HASHNODE_PAT = '2d092ab2-6e54-4111-9130-59805fa575e0';

// Create a singleton Apollo Client instance
let client: ApolloClient | null = null;

export function getClient(): ApolloClient {
  // Create client if it doesn't exist or if we're on the server
  if (!client || typeof window === 'undefined') {
    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: HASHNODE_API_URL,
        headers: {
          'Content-Type': 'application/json',
          ...(HASHNODE_PAT && { Authorization: HASHNODE_PAT }),
        },
        // Enable caching for static site generation
        fetchOptions: {
          next: { revalidate: 600 }, // Cache for 1 hour
        },
      }),
    });
  }

  return client;
}
