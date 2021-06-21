/**
 * Query CMS API data for resource associated with alias.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiQueryAlias } from '../api/fetchPriApi';

export const fetchQueryAlias = async (
  alias: string
): Promise<PriApiResourceResponse> => {
  return fetchPriApiQueryAlias(alias, {
    fields: ['id']
  });
};
