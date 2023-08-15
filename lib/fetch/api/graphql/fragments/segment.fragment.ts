import { gql } from '@apollo/client';

export const SEGMENT_LIST_PROPS = gql`
  fragment SegmentListProps on Segment {
    id
    link
    title
    segmentContent {
      audio {
        id
      }
    }
  }
`;
