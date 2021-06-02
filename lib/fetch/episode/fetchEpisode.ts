/**
 * Fetch Episode data from CMS API.
 */

import {
  IPriApiResourceResponse,
  PriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { fullEpisodeParams } from '../api/params';

export const fetchEpisode = async (
  id: string
): Promise<PriApiResourceResponse> => {
  return fetchPriApiItem('node--episodes', id, {
    ...fullEpisodeParams
  }).then((resp: IPriApiResourceResponse) => resp);
};
