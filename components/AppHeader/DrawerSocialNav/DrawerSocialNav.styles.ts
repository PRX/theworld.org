/**
 * @file DrawerTopNav.style.ts
 * Styles for DrawerTopNav.
 */

import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const drawerTopNavStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridGap: theme.typography.pxToRem(16),
      justifyContent: 'center'
    }
  })
);
