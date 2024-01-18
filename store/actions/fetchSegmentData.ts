/**
 * @file fetchAudioData.ts
 *
 * Actions to fetch data for a audio resource.
 */

import { SegmentIdType } from '@interfaces';
import { fetchGqlSegment } from '@lib/fetch';

export const fetchSegmentData = async (
  id: string,
  idType?: SegmentIdType,
  authToken?: string
) => {
  const segment = await fetchGqlSegment(id, idType, authToken);

  return segment;
};
