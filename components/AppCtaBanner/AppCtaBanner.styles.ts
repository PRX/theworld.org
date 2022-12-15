/**
 * @file appCtaBanner.style.ts
 * Styles for appCtaBanner.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const appCtaBannerTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h2: {
        color: theme.palette.primary.contrastText,
        fontSize: '1.2rem'
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.3
      }
    },
    overrides: {
      MuiButton: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: theme.palette.secondary.main
          }
        }
      },
      MuiCheckbox: {
        root: {
          color: 'inherit'
        }
      },
      MuiFormControlLabel: {
        root: {
          paddingLeft: theme.spacing(2)
        },
        label: {
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(0),
          textAlign: 'left'
        }
      },
      MuiIconButton: {
        root: {
          '&:hover': {
            backgroundColor: theme.palette.action.focus
          }
        }
      },
      MuiToolbar: {
        root: {
          justifyContent: 'center',
          marginTop: 0,
          marginBottom: 0,
          '& > * + *': {
            marginLeft: theme.spacing(2)
          }
        }
      }
    }
  });

export const appCtaBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  }
}));
