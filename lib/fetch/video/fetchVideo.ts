/**
 * Fetch Video data from CMS API.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { fullVideoParams } from '../api/params';

export const fetchVideo = async (
  id: string
): Promise<PriApiResourceResponse> => {
  return fetchPriApiItem('file--videos', id, {
    ...fullVideoParams
  });
};
