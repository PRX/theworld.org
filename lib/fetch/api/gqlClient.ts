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
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          additionalDates: {
            merge: true
          },
          additionalMedia: {
            merge: true
          },
          presentation: {
            merge: true
          }
        }
      },
      Episode: {
        fields: {
          episodeAudio: {
            merge: true
          },
          episodeDates: {
            merge: true
          },
          episodeContributors: {
            merge: true
          }
        }
      },
      Segment: {
        fields: {
          segmentContent: {
            merge: true
          }
        }
      },
      MediaItem: {
        fields: {
          audioFields: { merge: true }
        }
      },
      Program: {
        fields: {
          posts: { merge: true }
        }
      }
    }
  }),
  link: from([httpLink])
});

export default gqlClient;
