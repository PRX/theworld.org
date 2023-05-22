/**
 * @file PageHeader.style.tsx
 * Styles for Audio layout.
 */

import { makeStyles } from 'tss-react/mui';

export const pageHeaderStyles = makeStyles()((theme) => ({
  root: {
    fontSize: '1.2rem'
  },
  title: {
    fontSize: theme.typography.pxToRem(46)
  }
}));
