/**
 * Fetch Newsletter data from CMS API.
 */

import { PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '../api/fetchPriApi';

export const fetchNewsletter = async (
  id: string
): Promise<PriApiResourceResponse> =>
  fetchPriApiItem('node--newsletter_sign_ups', id, {
    include: ['image']
  });
