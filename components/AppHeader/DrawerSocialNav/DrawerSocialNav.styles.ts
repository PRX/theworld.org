/**
* @file DrawerTopNav.style.ts
* Styles for DrawerTopNav.
*/

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const drawerTopNavStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: theme.typography.pxToRem(theme.spacing(2)),
    justifyContent: 'center'
  }
}));
