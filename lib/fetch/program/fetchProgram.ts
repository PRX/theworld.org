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

    // Build response object.
    const resp = {
      data: {
        ...program,
        featuredStory: featuredStories
          ? featuredStories.shift()
          : stories.data.shift(),
        featuredStories: featuredStories
          ? featuredStories.concat(
              stories.data.splice(0, 4 - featuredStories.length)
            )
          : stories.data.splice(0, 4),
        stories,
        episodes
      }
    } as IPriApiResourceResponse;

    return resp;
  }

  return false;
};
