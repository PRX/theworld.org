/**
 * @file AppCtaLoadUnder.style.ts
 * Styles for AppCtaLoadUnder.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const appCtaLoadUnderTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h2: {
        color: theme.palette.primary.contrastText,
        fontSize: '1.25rem'
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.2
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            '&:hover': {
              backgroundColor: theme.palette.secondary.main
            }
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: 'inherit'
          }
        }
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            paddingLeft: theme.spacing(2)
          },
          label: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            textAlign: 'left'
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: theme.palette.action.focus
            }
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            justifyContent: 'center',
            '& > * + *': {
              marginLeft: theme.spacing(2)
            },
            [theme.breakpoints.down('sm')]: {
              marginTop: theme.spacing(1)
            }
          }
        }
      }
    }
  });

export const appCtaLoadUnderStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    zIndex: theme.zIndex.drawer,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },

  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));
