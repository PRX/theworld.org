/**
 * @file gqlClient.ts
 * Initialize Apollo GraphQL client.
 */

import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: `${process.env.API_URL_BASE}/${process.env.WP_GRAPHQL_ENDPOINT}`,
  fetchOptions: {
    method: 'GET'
  }
});

export const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([httpLink])
});

export default gqlClient;
