/**
 * @file fetchAudioData.ts
 *
 * Actions to fetch data for a audio resource.
 */

import { SegmentIdType } from '@interfaces';
import { fetchGqlSegment } from '@lib/fetch';

export const fetchSegmentData = async (id: string, idType?: SegmentIdType) => {
  const segment = await fetchGqlSegment(id, idType);

  return segment;
};
