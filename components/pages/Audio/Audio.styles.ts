/**
 * @file Audio.styles.tsx
 * Theme and styles for Audio layout.
 */

import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const audioStyles = makeStyles()((theme) => ({
  ...storyBodyStyles(theme),
  main: {
    marginBlockEnd: theme.spacing(5)
  }
}));
