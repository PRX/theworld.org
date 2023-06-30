/**
 * Fetch Episode data from WP GraphQL API.
 */

import type { Episode } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { IMAGE_PROPS, POST_SEO_PROPS } from '@lib/fetch/api/graphql';

const CONTRIBUTOR_PROPS = gql`
  fragment ContributorProps on Contributor {
    id
    link
    name
    contributorDetails {
      image {
        ...ImageProps
      }
    }
  }
`;

const GET_EPISODE = gql`
  query getEpisode($id: ID!) {
    episode(id: $id) {
      id
      link
      title
      content
      featuredImage {
        node {
          ...ImageProps
          caption
        }
      }
      programs {
        nodes {
          id
          link
          name
        }
      }
      episodeDates {
        broadcastDate
      }
      episodeAudio {
        audio {
          id
          audioFields {
            segmentsList {
              ... on Segment {
                id
                link
                title
                segmentContent {
                  audio {
                    id
                  }
                }
              }
            }
          }
        }
      }
      episodeContent {
        spotifyPlaylists {
          spotifyPlaylist
        }
      }
      episodeContributors {
        hosts {
          ...ContributorProps
        }
        guests {
          ...ContributorProps
        }
        producers {
          ...ContributorProps
        }
        reporters {
          ...ContributorProps
        }
      }
      seo {
        ...PostSEOProps
      }
    }
  }
  ${CONTRIBUTOR_PROPS}
  ${IMAGE_PROPS}
  ${POST_SEO_PROPS}
`;

export async function fetchGqlEpisode(id: string) {
  const response = await gqlClient.query<{
    episode: Episode;
  }>({
    query: GET_EPISODE,
    variables: {
      id
    }
  });
  const episode = response?.data?.episode;

  if (!episode) return undefined;

  return episode;
}

export default fetchGqlEpisode;
