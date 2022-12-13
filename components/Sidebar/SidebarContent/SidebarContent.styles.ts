/**
 * @file SidebarContent.style.ts
 * Styles for SidebarContent.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const sidebarContentTheme = (theme: Theme) => {
  return createTheme(theme, {});
};

export const sidebarContentStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...theme.typography.body1,
      '& > *': {
        margin: 0
      },
      '& > * + *': {
        marginTop: theme.typography.pxToRem(16)
      }
    }
  })
);
