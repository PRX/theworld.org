/**
 * Fetch Category data from CMS API.
 *
 * @param id Category identifier.
 */

import type { Category, Maybe } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import {
  EPISODE_CARD_PROPS,
  IMAGE_PROPS,
  POST_CARD_PROPS,
  TAXONOMY_SEO_PROPS
} from '@lib/fetch/api/graphql';

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
      seo {
        ...TaxonomySEOProps
      }
      children(first: 100) {
        nodes {
          id
          name
          link
        }
      }
      episodes(first: 10) {
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
  ${POST_CARD_PROPS}
  ${IMAGE_PROPS}
  ${TAXONOMY_SEO_PROPS}
  ${EPISODE_CARD_PROPS}
`;

export async function fetchGqlCategory(id: string, idType?: string) {
  const response = await gqlClient.query<{
    category: Maybe<Category>;
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
