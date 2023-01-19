/**
 * @file AppHeader.style.ts
 * Styles for AppHeader.
 */

import { makeStyles } from 'tss-react/mui';

export const appHeaderStyles = makeStyles()((theme) => ({
  root: {},
  toolbar: {},

  closeBtn: {
    textTransform: 'capitalize'
  },

  closeBtnIcon: {
    marginRight: theme.spacing(0.5)
  },

  twLogo: {
    display: 'block',
    width: 'auto',
    height: theme.typography.pxToRem(28),
    fill: theme.palette.primary.contrastText,
    [theme.breakpoints.down('xs')]: {
      height: theme.typography.pxToRem(22)
    }
  },

  menuButton: {},

  grow: {
    flexGrow: 1
  }
}));
