import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
const HASHNODE_PAT = '2d092ab2-6e54-4111-9130-59805fa575e0';

// Use Next.js 15 compatible Apollo Client for RSC
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: HASHNODE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        ...(HASHNODE_PAT && { Authorization: HASHNODE_PAT }),
      },
      // Use standard fetch for Next.js 15 compatibility
      fetchOptions: {
        cache: 'no-store', // We'll handle caching at the query level
      },
    }),
  });
});
