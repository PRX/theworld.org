/**
 * Fetch Program data from CMS API.
 *
 * @param id Program identifier.
 */

import type { Program } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { IMAGE_PROPS, POST_CARD_PROPS } from '@lib/fetch/api/graphql';

const GET_PROGRAM = gql`
  query getProgram($id: ID!) {
    program(id: $id) {
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
      programHosts {
        hosts {
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
    }
  }
  ${POST_CARD_PROPS}
  ${IMAGE_PROPS}
`;

export async function fetchGqlProgram(id: string) {
  const response = await gqlClient.query<{
    program: Program;
  }>({
    query: GET_PROGRAM,
    variables: {
      id
    }
  });
  const program = response?.data?.program;

  if (!program) return undefined;

  return program;
}

export default fetchGqlProgram;
