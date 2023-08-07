/**
 * Fetch Audio data from CMS API.
 *
 * @param id Audio identifier.
 */

import type { Maybe, MediaItem } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { AUDIO_PARENT_PROPS, IMAGE_PROPS } from '@lib/fetch/api/graphql';

const GET_AUDIO = gql`
  query getAudio($id: ID!) {
    mediaItem(id: $id) {
      id
      title
      date
      sourceUrl
      mediaItemUrl
      contributors {
        nodes {
          id
          name
          link
        }
      }
      audioFields {
        audioTitle
        broadcastDate
        program {
          id
          link
          name
          taxonomyImages {
            logo {
              ...ImageProps
            }
          }
        }
      }
      parent {
        ...AudioParentProps
      }
    }
  }
  ${IMAGE_PROPS}
  ${AUDIO_PARENT_PROPS}
`;

export async function fetchGqlAudio(id: string) {
  const response = await gqlClient.query<{
    mediaItem: Maybe<MediaItem>;
  }>({
    query: GET_AUDIO,
    variables: {
      id
    }
  });
  const audio = response?.data?.mediaItem;

  if (!audio) return undefined;

  return audio;
}

export default fetchGqlAudio;
