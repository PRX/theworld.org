/**
 * @file TeamHeader.style.tsx
 * Styles for team header.
 */

import { makeStyles } from 'tss-react/mui';

export const teamHeaderStyles = makeStyles()((theme) => ({
  root: {
    fontSize: '1.2rem'
  },
  title: {
    fontSize: theme.typography.pxToRem(46)
  }
}));
