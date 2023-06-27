import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { ParsedUrlQuery } from 'querystring';
import type { IEpisode, IProgram, IStory } from '@interfaces';
import type { TwApiCollection } from '@interfaces/api';
import { fetchTwApi } from '@lib/fetch/api';
import {
  TwApiDataTermProgram,
  parseTwApiDataTermProgram
} from '@lib/parse/data';
import parseTwApiDataPostEpisode from '@lib/parse/data/parseTwApiDataPostEpisode';
import {
  type TwApiDataPostStory,
  parseTwApiDataPostStory
} from '@lib/parse/data/parseTwApiDataPostStory';
import { basicTwApiStoryParams } from '../api/params';
import { fetchTwApiProgramStories } from './fetchTwApiProgramStories';
import { fetchTwApiProgramEpisodes } from './fetchTwApiProgramEpisodes';

export const fetchTwApiProgram = async (
  id: number,
  params?: ParsedUrlQuery,
  init?: RequestInit
) => {
  const programResp = await fetchTwApi<TwApiDataTermProgram>(
    `wp/v2/program/${id}`,
    undefined,
    init
  );
  const { data: programData } = programResp || {};

  if (!programData) return undefined;

  const program = parseTwApiDataTermProgram(programData);
  const { featuredStories, ...programRest } = program;
  const storiesRequestParams = {
    ...basicTwApiStoryParams,
    program: id,
    exclude: [] as number[]
  };
  const parallelRequests = [] as Promise<
    TwApiCollection<IStory> | TwApiCollection<IEpisode> | undefined
  >[];

  // Fetch featured stories data.
  if (featuredStories) {
    const featuredStoriesIds = featuredStories.map<number>(
      (item: number | IStory) => (typeof item === 'number' ? item : item.id)
    );

    parallelRequests.push(
      fetchTwApi<TwApiDataPostStory[]>(
        'wp/v1/posts',
        {
          ...basicTwApiStoryParams,
          include: featuredStoriesIds
        },
        init
      ).then(
        (resp) =>
          resp && {
            meta: resp.meta,
            data: resp.data.map((storyApi) => parseTwApiDataPostStory(storyApi))
          }
      )
    );

    storiesRequestParams.exclude = featuredStoriesIds;
  }

  // Fetch stories and episodes for stories view.
  if (!params?.v || params.v !== 'episodes') {
    parallelRequests.unshift(
      fetchTwApiProgramStories(
        programData,
        undefined,
        undefined,
        undefined,
        init
      ).then(
        (resp) =>
          resp && {
            ...resp,
            data: resp.data.map((storyApi) => parseTwApiDataPostStory(storyApi))
          }
      )
    );

    parallelRequests.unshift(
      fetchTwApiProgramEpisodes(id, 1, 1, undefined, init).then(
        (resp) =>
          resp && {
            ...resp,
            data: resp.data.map((episode) => parseTwApiDataPostEpisode(episode))
          }
      )
    );
  }

  // Fetch stories and episodes for episodes view.
  if (params?.v === 'episodes') {
    parallelRequests.unshift(
      fetchTwApiProgramStories(programData, 1, 5, undefined, init).then(
        (resp) =>
          resp && {
            ...resp,
            data: resp.data.map((storyApi) => parseTwApiDataPostStory(storyApi))
          }
      )
    );

    parallelRequests.unshift(
      fetchTwApiProgramEpisodes(id, 1, 5, undefined, init).then(
        (resp) =>
          resp && {
            ...resp,
            data: resp.data.map((episode) => parseTwApiDataPostEpisode(episode))
          }
      )
    );
  }

  // Use results of requests.
  const { episodesResp, storiesResp, featuredStoriesResp } = await Promise.all(
    parallelRequests
  ).then(([er, sr, fsr]) => ({
    ...(er && { episodesResp: er as TwApiCollection<IEpisode> }),
    ...(sr && { storiesResp: sr as TwApiCollection<IStory> }),
    ...(fsr && { featuredStoriesResp: fsr as TwApiCollection<IStory> })
  }));

  return {
    ...programRest,
    ...(episodesResp && {
      episodes: [episodesResp]
    }),
    ...((featuredStoriesResp || storiesResp) && {
      featuredStory: featuredStoriesResp?.data
        ? featuredStoriesResp.data.shift()
        : storiesResp?.data.shift(),
      featuredStories: featuredStoriesResp?.data
        ? [
            ...featuredStoriesResp.data,
            ...(storiesResp?.data
              ? storiesResp.data.splice(0, 4 - featuredStoriesResp.data.length)
              : [])
          ]
        : storiesResp?.data.splice(1, 4),
      ...(!!storiesResp?.data.length && {
        stories: [storiesResp]
      })
    })
  } as IProgram;
};

export default fetchTwApiProgram;
