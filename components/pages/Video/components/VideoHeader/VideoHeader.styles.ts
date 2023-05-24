/**
 * @file VideoHeader.style.tsx
 * Styles for VideoHeader layout.
 */

import { makeStyles } from 'tss-react/mui';

export const videoHeaderStyles = makeStyles()(theme => ({
  root: {
    fontSize: '1.2rem'
  },

  date: {
    fontStyle: 'italic'
  },

  info: {
    display: 'grid',
    alignContent: 'start',
    gridArea: 'INFO',
    gridGap: theme.typography.pxToRem(4)
  }
}));
