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
import { ParsedUrlQuery } from 'querystring';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';
import { fetchTermEpisodes } from './fetchTermEpisodes';
import { fetchTermStories } from './fetchTermStories';

export const fetchTerm = async (
  id: string,
  params?: ParsedUrlQuery
): Promise<PriApiResourceResponse> => {
  const termParams = {
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
    termParams
  ).then((resp: IPriApiResourceResponse) => resp && resp.data);

  if (term) {
    const { featuredStories } = term;
    if (!params?.v || params.v !== 'episodes') {
      const stories = await fetchTermStories(term).then(
        (resp: IPriApiCollectionResponse) => resp
      );
      const storiesData = [...stories.data];
      const episodes = await fetchTermEpisodes(term, 1, 1).then(
        (resp: IPriApiCollectionResponse) => resp
      );

      return {
        data: {
          ...term,
          featuredStory: featuredStories
            ? featuredStories.shift()
            : storiesData.shift(),
          featuredStories: featuredStories
            ? [
                ...featuredStories,
                ...storiesData.splice(0, 4 - featuredStories.length)
              ]
            : storiesData.splice(0, 4),
          stories: {
            ...stories,
            data: storiesData
          },
          episodes
        }
      } as IPriApiResourceResponse;
    }

    if (params?.v === 'episodes') {
      const stories = await fetchTermStories(term, 1, 5).then(
        (resp: IPriApiCollectionResponse) => resp
      );
      const storiesData = [...stories.data];
      const episodes = await fetchTermEpisodes(term, 1, 5).then(
        (resp: IPriApiCollectionResponse) => resp
      );

      return {
        data: {
          ...term,
          featuredStory: featuredStories
            ? featuredStories.shift()
            : storiesData.shift(),
          featuredStories: featuredStories
            ? [
                ...featuredStories,
                ...storiesData.splice(0, 4 - featuredStories.length)
              ]
            : storiesData.splice(0, 4),
          stories: {
            ...stories,
            data: storiesData
          },
          episodes
        }
      } as IPriApiResourceResponse;
    }
  }

  return false;
};
