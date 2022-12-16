/**
 * @file body.ts
 * Body styles as JSS object.
 */

import { createStyles, Theme } from '@mui/material/styles';
import {
  storyBodyQAStyles,
  storyBodyMediaStyles,
  storyBodyStoryActStyles,
  storyBodyTypography
} from './body';

export const storyBodyStyles = (theme: Theme) =>
  createStyles({
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
    }
  }) as any;
