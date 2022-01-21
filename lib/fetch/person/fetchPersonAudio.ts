/**
 * Fetch audio for a person from CMS API.
 *
 * @param id Person data or identifier.
 * @param audioType Type of audio to fetch.
 * @param page Page number to fetch.
 * @param range Number of items per page.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiQuery } from '../api/fetchPriApi';
import { basicAudioParams } from '../api/params';

export const fetchPersonAudio = async (
  id: string,
  audioType?: string,
  page: number = 1,
  range: number = 10
): Promise<PriApiResourceResponse> =>
  fetchPriApiQuery('file--audio', {
    ...basicAudioParams,
    'filter[audioAuthor]': id,
    sort: '-broadcast_date',
    ...(audioType && { 'filter[type]': audioType }),
    ...(page && { page: `${page}` }),
    ...(range && { range: `${range}` })
  });
