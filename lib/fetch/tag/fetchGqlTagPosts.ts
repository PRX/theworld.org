/**
 * Fetch Tag posts data from CMS API.
 *
 * @param id Tag identifier.
 * @param options Query options.
 */

import type { CollectionQueryOptions, Maybe, Tag } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { IMAGE_PROPS, POST_CARD_PROPS } from '@lib/fetch/api/graphql';

const GET_TAG_POSTS = (taxonomySingleName?: Maybe<string>) => gql`
  query getTagPosts(
    $id: ID!
    $pageSize: Int = 10
    $cursor: String
    $exclude: [ID]
  ) {
    ${taxonomySingleName || 'tag'}(id: $id) {
      id
      posts(
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
            ...PostCardProps
          }
        }
      }
    }
  }
  ${POST_CARD_PROPS}
  ${IMAGE_PROPS}
`;

export async function fetchGqlTagPosts(
  id: string,
  options?: CollectionQueryOptions,
  taxonomySingleName?: Maybe<string>
) {
  const response = await gqlClient.query<{
    tag: Tag;
  }>({
    query: GET_TAG_POSTS(taxonomySingleName),
    variables: {
      id,
      ...options
    }
  });
  const posts = response?.data?.tag.posts;

  if (!posts) return undefined;

  return posts;
}

export default fetchGqlTagPosts;
