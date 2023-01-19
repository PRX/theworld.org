/**
 * Fetch Audio data from CMS API.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { fullAudioParams } from '../api/params';

export const fetchAudio = async (id: string): Promise<PriApiResourceResponse> =>
  fetchPriApiItem('file--audio', id, {
    ...fullAudioParams
  });
