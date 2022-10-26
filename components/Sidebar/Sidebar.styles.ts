/**
 * @file Sidebar.style.ts
 * Styles for Sidebar.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
