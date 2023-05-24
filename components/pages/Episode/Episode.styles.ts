/**
 * @file Episode.theme.tsx
 * Theme and styles for Episode layout.
 */

import { makeStyles } from 'tss-react/mui';
import { storyLayoutStyles } from '@components/pages/Story/layouts/default/styles/Story.layout';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const episodeStyles = makeStyles()(theme => ({
  ...storyLayoutStyles(theme),
  ...storyBodyStyles(theme),

  heading: {
    fontSize: theme.typography.pxToRem(20),
    marginBottom: theme.typography.pxToRem(16)
  },

  MuiDividerRoot: {
    marginBottom: theme.typography.pxToRem(24)
  }
}));
