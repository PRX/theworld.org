/**
 * @file AppHeader.style.ts
 * Styles for AppHeader.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const appHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    toolbar: {
      columnGap: theme.spacing(1)
    },
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
    menuButton: {},
    grow: {
      flexGrow: 1
    }
  })
);
