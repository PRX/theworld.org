/**
 * @file Marquee.style.ts
 * Styles and theme for Marquee.
 */

import { makeStyles } from 'tss-react/mui';

export const useMarqueeStyles = makeStyles()(theme => ({
  root: {
    overflow: 'hidden'
  },

  content: {
    position: 'relative',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    paddingInlineEnd: theme.typography.pxToRem(2)
  }
}));
