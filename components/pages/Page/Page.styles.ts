/**
 * @file Page.styles.tsx
 * Theme and styles for Page layout.
 */

import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const pageStyles = makeStyles()((theme) => ({
  ...storyBodyStyles(theme)
}));
