import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { IHomepage } from '@interfaces';
import type { TwApiCollection } from '@interfaces/api';
import { fetchTwApi, fetchTwApiProgram } from '@lib/fetch';
import {
  type TwApiDataPostStory,
  parseTwApiDataPostStory
} from '@lib/parse/data';

export const HOMEPAGE_PROGRAM_ID = 2;

export const fetchTwApiHomepage = async (init?: RequestInit) => {
  const [program, latestStories] = await Promise.all([
    fetchTwApiProgram(HOMEPAGE_PROGRAM_ID, undefined, init),
    fetchTwApi('posts', { program_exclude: HOMEPAGE_PROGRAM_ID }, init).then(
      (resp: TwApiCollection<TwApiDataPostStory>) =>
        resp && resp.data.map((story) => parseTwApiDataPostStory(story))
    )
  ]);

  const data = {
    ...program,
    latestStories
  } as IHomepage;

  return { data };
};
