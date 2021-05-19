/**
 * @file AppHeader.style.ts
 * Styles for AppHeader.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const appHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    closeBtn: {
      textTransform: 'capitalize'
    },
    closeBtnIcon: {
      marginRight: theme.spacing(0.5)
    },
    twLogo: {
      width: 'auto',
      height: theme.typography.pxToRem(28),
      fill: theme.palette.primary.contrastText
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    grow: {
      flexGrow: 1
    }
  })
);
