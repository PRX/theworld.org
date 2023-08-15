/**
 * Fetch Contributor data from CMS API.
 *
 * @param id Contributor identifier.
 */

import type { Contributor, Maybe } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import {
  IMAGE_PROPS,
  POST_CARD_PROPS,
  SEGMENT_LIST_PROPS,
  TAXONOMY_SEO_PROPS
} from '@lib/fetch/api/graphql';

const GET_CONTRIBUTOR = gql`
  query getContributor($id: ID!, $idType: ContributorIdType) {
    contributor(id: $id, idType: $idType) {
      id
      link
      name
      description
      contributorDetails {
        position
        teaser
        program {
          id
          link
          name
        }
        image {
          ...ImageProps
        }
      }
      contributorSocialLinks {
        blog
        email
        facebook
        instagram
        podcast
        rss
        tiktok
        tumblr
        twitter
        website
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
      seo {
        ...TaxonomySEOProps
      }
      segments(first: 1000) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            ...SegmentListProps
          }
        }
      }
    }
  }
  ${POST_CARD_PROPS}
  ${IMAGE_PROPS}
  ${TAXONOMY_SEO_PROPS}
  ${SEGMENT_LIST_PROPS}
`;

export async function fetchGqlContributor(id: string, idType?: string) {
  const response = await gqlClient.query<{
    contributor: Maybe<Contributor>;
  }>({
    query: GET_CONTRIBUTOR,
    variables: {
      id,
      idType
    }
  });
  const contributor = response?.data?.contributor;

  if (!contributor) return undefined;

  return contributor;
}

export default fetchGqlContributor;
