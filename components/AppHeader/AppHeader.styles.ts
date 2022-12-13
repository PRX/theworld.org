/**
 * @file AppHeader.style.ts
 * Styles for AppHeader.
 */

import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const appHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);
