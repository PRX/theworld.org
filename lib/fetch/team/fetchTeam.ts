/**
 * Fetch Team data from CMS API.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiQuery } from '../api/fetchPriApi';

export const fetchTeam = async (id: string): Promise<PriApiResourceResponse> =>
  fetchPriApiQuery('node--people', {
    include: ['image'],
    'filter[status]': 1,
    'filter[department][value]': id,
    'filter[department][operator]': '"CONTAINS"',
    sort: 'title',
    range: 100
  });
