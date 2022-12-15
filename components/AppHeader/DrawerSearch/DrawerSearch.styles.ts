/**
 * @file DrawerSearch.style.ts
 * Styles and theme for DrawerSearch.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const appDrawerSearchTheme = (theme: Theme) => {
  return createTheme(theme, {
    overrides: {
      MuiInputBase: {
        root: {
          color: theme.palette.primary.contrastText
        }
      },
      MuiFormLabel: {
        root: {
          color: theme.palette.primary.contrastText
        }
      },
      MuiInput: {
        underline: {
          '&::before': {
            borderBottomColor: theme.palette.primary.contrastText
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderBottomColor: theme.palette.primary.contrastText
          }
        }
      }
    }
  });
};

export const appDrawerSearchStyles = makeStyles()(theme => ({
  root: {
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`
  }
}));
