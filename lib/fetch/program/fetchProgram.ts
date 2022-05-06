/**
 * Fetch program data from CMS API.
 *
 * @param id Program identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';
import { fetchProgramEpisodes } from './fetchProgramEpisodes';
import { fetchProgramStories } from './fetchProgramStories';

export const fetchProgram = async (
  id: string
): Promise<PriApiResourceResponse> => {
  const params = {
    include: [
      'banner_image',
      'hosts.image',
      'logo',
      'podcast_logo',
      ...(basicStoryParams.include || []).map(
        param => `featured_stories.${param}`
      )
    ]
  };
  const program = await fetchPriApiItem(
    'node--programs',
    id as string,
    params
  ).then((resp: IPriApiResourceResponse) => resp && resp.data);

  if (program) {
    const { featuredStories } = program;
    const [stories, episodes] = await Promise.all([
      fetchProgramStories(program).then(
        (resp: IPriApiCollectionResponse) => resp
      ),
      fetchProgramEpisodes(program).then(
        (resp: IPriApiCollectionResponse) => resp
      )
    ]);
    const storiesData = [...stories.data];

    // Build response object.
    const resp = {
      data: {
        ...program,
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

    return resp;
  }

  return false;
};
