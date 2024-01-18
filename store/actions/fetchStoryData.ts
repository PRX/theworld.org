/**
 * @file fetchStoryData.ts
 *
 * Actions to fetch data for a story resource.
 */

import { fetchGqlStory } from '@lib/fetch';
import { PostIdType } from '@interfaces';

export const fetchStoryData = async (
  id: string | number,
  idType?: PostIdType,
  authToken?: string
) => {
  const story = await fetchGqlStory(id, idType, authToken);

  return story;
};
