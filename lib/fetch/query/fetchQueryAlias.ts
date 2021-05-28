/**
 * Query CMS API data for resource associated with alias.
 */

import {
  IPriApiResourceResponse,
  PriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiQueryAlias } from '../api/fetchPriApi';

export const fetchQueryAlias = async (
  alias: string
): Promise<PriApiResourceResponse> => {
  return fetchPriApiQueryAlias(alias, {
    fields: ['id']
  }).then((resp: IPriApiResourceResponse) => resp);
};
