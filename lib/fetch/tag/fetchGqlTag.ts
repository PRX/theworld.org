/**
 * Fetch Tag data from CMS API.
 *
 * @param id Tag identifier.
 */

import type { Maybe, PostTag } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import {
  IMAGE_PROPS,
  POST_CARD_PROPS,
  TAXONOMY_SEO_PROPS
} from '@lib/fetch/api/graphql';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const GET_TAG = (taxonomySingleName?: Maybe<string>) => gql`
  query getTag($id: ID!, $idType: ${capitalize(
    taxonomySingleName || 'tag'
  )}IdType) {
    ${taxonomySingleName || 'tag'}(id: $id, idType: $idType) {
      taxonomy {
        node {
          id
          name
          restBase
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
  const dataPropKey = taxonomySingleName || 'tag';
  const response = await gqlClient.query<{
    [k: string]: PostTag;
  }>({
    query: GET_TAG(taxonomySingleName),
    variables: {
      id,
      idType
    }
  });
  const tag = response?.data?.[dataPropKey];

  if (!tag) return undefined;

  return tag;
}

export default fetchGqlTag;
