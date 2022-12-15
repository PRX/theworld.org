/**
 * @file Sidebar.style.ts
 * Styles for Sidebar.
 */

import { makeStyles } from 'tss-react/mui';

export const sidebarStyles = makeStyles()(theme => ({
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
}));
