/**
 * Fetch person data from CMS API.
 *
 * @param id Person identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';
import { fetchPersonAudio } from './fetchPersonAudio';
import { fetchPersonStories } from './fetchPersonStories';

export const fetchPerson = async (
  id: string
): Promise<PriApiResourceResponse> => {
  const params = {
    include: [
      'program',
      'image',
      'social_links',
      ...(basicStoryParams.include || []).map(
        param => `featured_stories.${param}`
      )
    ]
  };
  const person = await fetchPriApiItem(
    'node--people',
    id as string,
    params
  ).then((resp: IPriApiResourceResponse) => resp && resp.data);

  if (person) {
    const { featuredStories } = person;
    const stories = await fetchPersonStories(person).then(
      (resp: IPriApiCollectionResponse) => resp
    );
    const segments = await fetchPersonAudio(id, 'program-segment');

    // Build response object.
    const resp = {
      data: {
        ...person,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : stories.data.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              stories.data.splice(0, 4 - featuredStories.length)
            )
          : stories.data.splice(0, 4),
        stories,
        segments
      }
    } as IPriApiResourceResponse;

    return resp;
  }

  return false;
};
