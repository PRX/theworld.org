/**
 * @file gqlClient.ts
 * Initialize Apollo GraphQL client.
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const gqlClient = new ApolloClient({
  uri: `${process.env.API_URL_BASE}/${process.env.WP_GRAPHQL_ENDPOINT}`,
  cache: new InMemoryCache()
});

export default gqlClient;
