/**
 * Fetch program data from CMS API.
 *
 * @param id Program identifier.
 */

import {
  PriApiResourceResponse,
  IPriApiResource,
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
  const program = await fetchPriApiItem('node--programs', id as string, params);

  if (program) {
    const { data } = program;
    const { featuredStories } = data as IPriApiResource;

    // Fetch list of stories. Paginated.
    const stories = (await fetchProgramStories(
      data as IPriApiResource,
      1,
      undefined,
      undefined
    )) as IPriApiCollectionResponse;

    // Fetch list of episodes. Paginated.
    const episodes = (await fetchProgramEpisodes(
      data as IPriApiResource,
      1,
      undefined,
      undefined
    )) as IPriApiCollectionResponse;

    // Build response object.
    const resp = {
      data: {
        ...program.data,
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
