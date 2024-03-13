/**
 * @file body.ts
 * Body styles as JSS object.
 */

import { type Theme } from '@mui/material/styles';
import { type CSSObject } from 'tss-react';
import {
  storyBodyMediaStyles,
  storyBodyQAStyles,
  storyBodyScrollGalleryStyles,
  storyBodyStoryActStyles,
  storyBodyTypography
} from './body';

export const storyBodyStyles = (theme: Theme) => ({
  body: {
    marginTop: theme.typography.pxToRem(32),

    ...storyBodyTypography(theme),
    ...storyBodyMediaStyles(theme),
    ...storyBodyQAStyles(theme),
    ...storyBodyScrollGalleryStyles(theme),
    ...storyBodyStoryActStyles(theme),

    '&::after': {
      content: '""',
      display: 'block',
      clear: 'both'
    }
  } as CSSObject
});
