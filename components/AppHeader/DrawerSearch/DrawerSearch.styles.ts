/**
 * @file DrawerSearch.style.ts
 * Styles and theme for DrawerSearch.
 */

import { makeStyles } from 'tss-react/mui';

export const appDrawerSearchStyles = makeStyles()(theme => ({
  root: {
    padding: `0 ${theme.spacing(2)} ${theme.spacing(2)}`
  },
  inputRoot: {
    color: theme.palette.primary.contrastText
  },
  labelRoot: {
    color: theme.palette.primary.contrastText
  },
  inputUnderline: {
    '&::before': {
      borderBottomColor: theme.palette.primary.contrastText
    },
    '&:hover:not(.Mui-disabled)::before': {
      borderBottomColor: theme.palette.primary.contrastText
    }
  }
}));
