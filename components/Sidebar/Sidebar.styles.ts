/**
 * @file Sidebar.style.ts
 * Styles for Sidebar.
 */

import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const sidebarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    container: {
      justifyContent: 'stretch'
    },
    item: {},
    stretch: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    elevated: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1]
    }
  })
);
