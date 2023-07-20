/**
 * Fetch Category data from CMS API.
 *
 * @param id Category identifier.
 */

import type { Category } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { IMAGE_PROPS, POST_CARD_PROPS } from '@lib/fetch/api/graphql';

const GET_CATEGORY = gql`
  query getCategory($id: ID!, $idType: CategoryIdType) {
    category(id: $id, idType: $idType) {
      id
      link
      name
      description
      teaserFields {
        teaser
      }
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
      categoryEditors {
        editors {
          id
          link
          name
          contributorDetails {
            image {
              ...ImageProps
            }
          }
        }
      }
      sponsorship {
        collectionSponsorLinks {
          sponsorLinks {
            url
            title
          }
        }
      }
      children(first: 100) {
        nodes {
          id
          name
          link
        }
      }
    }
  }
  ${POST_CARD_PROPS}
  ${IMAGE_PROPS}
`;

export async function fetchGqlCategory(id: string, idType?: string) {
  const response = await gqlClient.query<{
    category: Category;
  }>({
    query: GET_CATEGORY,
    variables: {
      id,
      idType
    }
  });
  const category = response?.data?.category;

  if (!category) return undefined;

  return category;
}

export default fetchGqlCategory;
