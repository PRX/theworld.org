/**
 * Fetch term data from CMS API.
 *
 * @param id Term identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';
import { fetchTermEpisodes } from './fetchTermEpisodes';
import { fetchTermStories } from './fetchTermStories';

export const fetchTerm = async (
  id: string
): Promise<PriApiResourceResponse> => {
  const params = {
    include: [
      ...(basicStoryParams.include || []).map(
        param => `featured_stories.${param}`
      )
    ],
    fields: [
      'title',
      'description',
      'metatags',
      ...(basicStoryParams.fields || []).map(
        param => `featured_stories.${param}`
      )
    ]
  };
  const term = await fetchPriApiItem(
    'taxonomy_term--terms',
    id as string,
    params
  ).then((resp: IPriApiResourceResponse) => resp && resp.data);

  if (term) {
    const { featuredStories } = term;
    const [stories, episodes] = await Promise.all([
      fetchTermStories(term).then((resp: IPriApiCollectionResponse) => resp),
      fetchTermEpisodes(term).then((resp: IPriApiCollectionResponse) => resp)
    ]);
    const storiesData = [...stories.data];

    // Build response object.
    const resp = {
      data: {
        ...term,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : storiesData.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              storiesData.splice(0, 4 - featuredStories.length)
            )
          : storiesData.splice(0, 4),
        stories: {
          ...stories,
          data: storiesData
        },
        episodes
      }
    } as IPriApiResourceResponse;

    return resp;
  }

  return false;
};
