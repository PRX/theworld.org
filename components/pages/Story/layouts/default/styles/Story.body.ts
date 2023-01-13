/**
 * @file body.ts
 * Body styles as JSS object.
 */

import { type Theme } from '@mui/material/styles';
import { type CSSObject } from 'tss-react';
import {
  storyBodyQAStyles,
  storyBodyMediaStyles,
  storyBodyStoryActStyles,
  storyBodyTypography
} from './body';

export const storyBodyStyles = (theme: Theme) => ({
  body: {
    ...storyBodyTypography(theme),
    ...storyBodyMediaStyles(theme),
    ...storyBodyQAStyles(theme),
    ...storyBodyStoryActStyles(theme),
    '&::after': {
      content: '""',
      display: 'block',
      clear: 'both'
    }
  } as CSSObject
});
