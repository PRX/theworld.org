/**
 * @file DrawerTopNav.style.ts
 * Styles for DrawerTopNav.
 */

import { makeStyles } from 'tss-react/mui';

export const drawerTopNavStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: theme.typography.pxToRem(16),
    justifyContent: 'center'
  }
}));
