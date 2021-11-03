/**
 * @file SidebarContent.style.ts
 * Styles for SidebarContent.
 */

import {
  createTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

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
        marginTop: theme.typography.pxToRem(theme.spacing(2))
      }
    }
  })
);
