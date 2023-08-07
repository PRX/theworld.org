/**
 * Fetch Segment data from CMS API.
 *
 * @param id Segment identifier.
 */

import type { Maybe, Segment } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { IMAGE_PROPS, POST_SEO_PROPS } from '@lib/fetch/api/graphql';

const GET_SEGMENT = gql`
  query getSegment($id: ID!, $idType: SegmentIdType) {
    segment(id: $id, idType: $idType) {
      id
      title
      content
      contributors {
        nodes {
          id
          name
          link
        }
      }
      programs(first: 1) {
        nodes {
          id
          name
          link
        }
      }
      segmentContent {
        audio {
          id
          audioFields {
            audioType
          }
        }
      }
      segmentDates {
        broadcastDate
      }
      seo {
        ...PostSEOProps
      }
    }
  }
  ${POST_SEO_PROPS}
  ${IMAGE_PROPS}
`;

export async function fetchGqlSegment(id: string, idType?: string) {
  const response = await gqlClient.query<{
    segment: Maybe<Segment>;
  }>({
    query: GET_SEGMENT,
    variables: {
      id,
      idType
    }
  });
  const segment = response?.data?.segment;

  if (!segment) return undefined;

  return segment;
}

export default fetchGqlSegment;
