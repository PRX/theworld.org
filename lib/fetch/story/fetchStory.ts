/**
 * Fetch Story data from CMS API.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { fullStoryParams } from '../api/params';

export const fetchStory = async (id: string): Promise<PriApiResourceResponse> =>
  fetchPriApiItem('node--stories', id, {
    ...fullStoryParams
  });
