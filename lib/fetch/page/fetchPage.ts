/**
 * Fetch Page data from CMS API.
 *
 * @param id Page identifier.
 */

import {
  IPriApiResourceResponse,
  PriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';

export const fetchPage = async (
  id: string
): Promise<PriApiResourceResponse> => {
  return fetchPriApiItem('node--pages', id, {}).then(
    (resp: IPriApiResourceResponse) => resp
  );
};
