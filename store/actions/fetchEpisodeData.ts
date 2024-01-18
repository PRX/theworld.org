/**
 * @file fetchEpisodeData.ts
 *
 * Actions to fetch data for a episode resource.
 */

import { EpisodeIdType } from '@interfaces';
import { fetchGqlEpisode } from '@lib/fetch';

export const fetchEpisodeData = async (
  id: string,
  idType?: EpisodeIdType,
  authToken?: string
) => {
  const episode = await fetchGqlEpisode(id, idType, authToken);

  return episode;
};
