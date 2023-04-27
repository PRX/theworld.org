import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { TwApiDataPostEpisode } from '@lib/parse/data';
import { basicTwApiStoryParams } from '../api/params';
import fetchTwApi, { TwApiCollection } from '../api/fetchTwApi';

/**
 * Fetch episodes for a program from WP API.
 *
 * @param id Program API data or identifier.
 * @param page Page of results to return.
 * @param range Number of items per page.
 * @param excluded Array of episode identifiers to exclude form results.
 * @param init Fetch initialization object.
 * @returns Response from WP API query.
 */
export const fetchTwApiProgramEpisodes = async (
  id: number,
  page: number = 1,
  range: number = 15,
  excluded?: number[] | number,
  init?: RequestInit
) => {
  const exclude =
    excluded &&
    [...(excluded && Array.isArray(excluded) ? excluded : [excluded])].filter(
      (v: number) => !!v
    );

  // Fetch list of stories. Paginated.
  return fetchTwApi(
    'wp/v2/posts',
    {
      ...basicTwApiStoryParams,
      ...(exclude && { exclude }),
      program: id,
      per_page: range,
      page
    },
    init
  ) as Promise<TwApiCollection<TwApiDataPostEpisode>>;
};
