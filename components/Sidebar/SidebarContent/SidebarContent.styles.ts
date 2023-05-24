/**
 * @file SidebarContent.style.ts
 * Styles for SidebarContent.
 */

import { makeStyles } from 'tss-react/mui';

export const sidebarContentStyles = makeStyles()(theme => ({
  root: {
    '& > *': {
      margin: 0
    },
    '& > * + *': {
      marginTop: theme.typography.pxToRem(16)
    }
  }
}));
