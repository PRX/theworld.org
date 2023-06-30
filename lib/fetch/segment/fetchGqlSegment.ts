/**
 * Fetch Segment data from CMS API.
 *
 * @param id Segment identifier.
 */

import type { Segment } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { POST_SEO_PROPS } from '@lib/fetch/api/graphql';

const GET_SEGMENT = gql`
  query getSegment($id: ID!) {
    segment(id: $id) {
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
`;

export async function fetchGqlSegment(id: string) {
  const response = await gqlClient.query<{
    segment: Segment;
  }>({
    query: GET_SEGMENT,
    variables: {
      id
    }
  });
  const segment = response?.data?.segment;

  if (!segment) return undefined;

  return segment;
}

export default fetchGqlSegment;
