/**
 * Fetch CTA data for a region group.
 *
 * @param id Page identifier.
 */

import {
  IPriApiResourceResponse,
  PriApiResourceResponse
} from 'pri-api-library/types';
import { postJsonPriApiCtaRegion } from '@lib/fetch/api/fetchPriApi';

export const fetchCtaRegionGroup = async (
  regionGroup: string
): Promise<PriApiResourceResponse> =>
  (await postJsonPriApiCtaRegion(regionGroup)) as IPriApiResourceResponse;
