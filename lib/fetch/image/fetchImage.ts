/**
 * Fetch Image data from CMS API.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { fullImageParams } from '../api/params';

export const fetchImage = async (id: string): Promise<PriApiResourceResponse> =>
  fetchPriApiItem('file--images', id, {
    ...fullImageParams
  });
