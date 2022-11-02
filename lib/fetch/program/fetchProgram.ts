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
import { ParsedUrlQuery } from 'querystring';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';
import { fetchProgramEpisodes } from './fetchProgramEpisodes';
import { fetchProgramStories } from './fetchProgramStories';

export const fetchProgram = async (
  id: string,
  params?: ParsedUrlQuery
): Promise<PriApiResourceResponse> => {
  const programParams = {
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
    programParams
  ).then((resp: IPriApiResourceResponse) => resp && resp.data);

  if (program) {
    const { featuredStories } = program;

    if (!params?.v || params.v !== 'episodes') {
      const stories = await fetchProgramStories(program).then(
        (resp: IPriApiCollectionResponse) => resp
      );
      const storiesData = [...stories.data];
      const episodes = await fetchProgramEpisodes(program, 1, 1).then(
        (resp: IPriApiCollectionResponse) => resp
      );

      return {
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
    }

    if (params?.v === 'episodes') {
      const stories = await fetchProgramStories(program, 1, 5).then(
        (resp: IPriApiCollectionResponse) => resp
      );
      const storiesData = [...stories.data];
      const episodes = await fetchProgramEpisodes(program, 1, 5).then(
        (resp: IPriApiCollectionResponse) => resp
      );

      return {
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
    }
  }

  return false;
};
