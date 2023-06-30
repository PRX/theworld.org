/**
 * @file Segment.styles.tsx
 * Theme and styles for Segment layout.
 */

import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const segmentStyles = makeStyles()((theme) => ({
  ...storyBodyStyles(theme),
  main: {
    marginBlockEnd: theme.spacing(5)
  }
}));
