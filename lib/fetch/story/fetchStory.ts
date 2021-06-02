/**
 * Fetch Story data from CMS API.
 */

import {
  IPriApiResourceResponse,
  PriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';
import { fullStoryParams } from '../api/params';

export const fetchStory = async (
  id: string
): Promise<PriApiResourceResponse> => {
  return fetchPriApiItem('node--stories', id, {
    ...fullStoryParams
  }).then((resp: IPriApiResourceResponse) => resp);
};
