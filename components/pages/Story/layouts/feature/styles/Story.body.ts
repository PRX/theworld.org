/**
 * @file body.ts
 * Body styles as JSS object.
 */

import { Theme } from '@mui/material/styles';
import { createStyles } from '@mui/styles';
import {
  storyBodyQAStyles,
  storyBodyMediaStyles,
  storyBodyStoryActStyles,
  storyBodyTypography
} from './body';

export const storyBodyStyles = (theme: Theme) =>
  createStyles({
    body: {
      marginTop: theme.typography.pxToRem(32),

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
