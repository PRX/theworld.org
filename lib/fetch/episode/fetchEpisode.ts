/**
 * Fetch Episode data from CMS API.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { fullEpisodeParams } from '../api/params';

export const fetchEpisode = async (
  id: string
): Promise<PriApiResourceResponse> =>
  fetchPriApiItem('node--episodes', id, {
    ...fullEpisodeParams
  });
