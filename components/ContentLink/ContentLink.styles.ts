/**
 * @file ContentLink.style.ts
 * Styles for ContentLink.
 */

import { makeStyles } from 'tss-react/mui';

export const contentLinkStyles = makeStyles()(theme => ({
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
}));
