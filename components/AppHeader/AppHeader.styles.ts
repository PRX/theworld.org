/**
 * @file AppHeader.style.ts
 * Styles for AppHeader.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const appHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none'
    },
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
  })
);
