/**
 * @file Category.theme.tsx
 * Theme and styles for Category layout.
 */

import { makeStyles } from 'tss-react/mui';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const categoryStyles = makeStyles()((theme) => ({
  ...storyBodyStyles(theme)
}));
