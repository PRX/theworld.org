import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { TwApiCollection, TwApiResource } from '@interfaces/api';
import type { TwApiDataPostStory, TwApiDataTermProgram } from '@lib/parse/data';
import { fetchTwApi } from '@lib/fetch/api';
import { basicTwApiStoryParams } from '@lib/fetch/api/params';

/**
 * Fetch stories for a program from WP API.
 *
 * @param id Program API data or identifier.
 * @param page Page of results to return.
 * @param range Number of items per page.
 * @param excluded Array of story identifiers to exclude form results.
 * @param init Fetch initialization object.
 * @returns Response from WP API query.
 */
export const fetchTwApiProgramStories = async (
  id: number | TwApiDataTermProgram,
  page: number = 1,
  range: number = 15,
  excluded?: number[] | number,
  init?: RequestInit
) => {
  const program =
    typeof id === 'number'
      ? await fetchTwApi<TwApiResource<TwApiDataTermProgram>>(
          `wp/v2/program/${id}`,
          { _fields: ['acf.featured_stories'] },
          init
        ).then((resp) => resp && resp.data)
      : id;

  if (program) {
    const { acf } = program;
    const { featured_stories: featuredStories } = acf || {};
    const exclude =
      (excluded || featuredStories) &&
      [
        ...(excluded && Array.isArray(excluded) ? excluded : [excluded]),
        ...(featuredStories ?? [])
      ].filter((v: number) => !!v);

    // Fetch list of stories. Paginated.
    return fetchTwApi<TwApiCollection<TwApiDataPostStory>>('wp/v2/posts', {
      ...basicTwApiStoryParams,
      ...(exclude && { exclude }),
      per_page: range,
      page
    });
  }

  return undefined;
};
