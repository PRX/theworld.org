/**
 * Fetch Tag episodes data from CMS API.
 *
 * @param id Tag identifier.
 * @param options Query options.
 */

import type { CollectionQueryOptions, Maybe, Tag } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { IMAGE_PROPS } from '@lib/fetch/api/graphql';
import { EPISODE_CARD_PROPS } from '../api/graphql/fragments/episode.fragment';

const GET_TAG_EPISODES = gql`
  query getTagEpisodes(
    $id: ID!
    $pageSize: Int = 10
    $cursor: String
    $exclude: [ID]
  ) {
    tag(id: $id) {
      id
      episodes(
        first: $pageSize
        after: $cursor
        where: { notIn: $exclude, orderby: { field: DATE, order: DESC } }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            ...EpisodeCardProps
          }
        }
      }
    }
  }
  ${EPISODE_CARD_PROPS}
  ${IMAGE_PROPS}
`;

export async function fetchGqlTagEpisodes(
  id: string,
  options?: CollectionQueryOptions
) {
  const response = await gqlClient.query<{
    tag: Maybe<Tag>;
  }>({
    query: GET_TAG_EPISODES,
    variables: {
      id,
      ...options
    }
  });
  const episodes = response?.data?.tag?.episodes;

  if (!episodes) return undefined;

  return episodes;
}

export default fetchGqlTagEpisodes;
