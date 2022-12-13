/**
 * @file ContentLink.style.ts
 * Styles for ContentLink.
 */

import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const contentLinkStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    isLoading: {
      animation: '$colorCycle 500ms linear 0s alternate infinite'
    },
    '@keyframes colorCycle': {
      from: {
        color: theme.palette.secondary.main
      },
      to: {
        color: theme.palette.primary.main
      }
    }
  })
);
