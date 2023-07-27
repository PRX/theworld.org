/**
 * Fetch Tag data from CMS API.
 *
 * @param id Tag identifier.
 */

import type { Maybe, Tag } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import {
  IMAGE_PROPS,
  POST_CARD_PROPS,
  TAXONOMY_SEO_PROPS
} from '@lib/fetch/api/graphql';

const GET_TAG = (taxonomySingleName?: Maybe<string>) => gql`
  query getTag($id: ID!, $idType: TagIdType) {
    ${taxonomySingleName || 'tag'}(id: $id, idType: $idType) {
      taxonomy {
        node {
          id
          name
          graphqlSingleName
          graphqlPluralName
        }
      }
      id
      link
      name
      description
      taxonomyImages {
        imageBanner {
          ...ImageProps
        }
        logo {
          ...ImageProps
        }
      }
      landingPage {
        featuredPosts {
          ... on Post {
            ...PostCardProps
          }
        }
      }
      seo {
        ...TaxonomySEOProps
      }
    }
  }
  ${POST_CARD_PROPS}
  ${IMAGE_PROPS}
  ${TAXONOMY_SEO_PROPS}
`;

export async function fetchGqlTag(
  id: string,
  idType?: string,
  taxonomySingleName?: Maybe<string>
) {
  const response = await gqlClient.query<{
    tag: Tag;
  }>({
    query: GET_TAG(taxonomySingleName),
    variables: {
      id,
      idType
    }
  });
  const tag = response?.data?.tag;

  if (!tag) return undefined;

  return tag;
}

export default fetchGqlTag;
