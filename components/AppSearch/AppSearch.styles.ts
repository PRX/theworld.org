/**
 * @file AppSearch.style.ts
 * Styles and theme for AppSearch.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { montserrat } from '@theme/fonts';
import { makeStyles } from 'tss-react/mui';

export const appSearchTheme = (theme: Theme) =>
  createTheme(theme, {
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            color: theme.palette.primary.contrastText
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            height: '100%'
          }
        }
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start'
          }
        }
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.background.default
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            fontSize: 'clamp(2rem, 10vw, 3rem)',
            fontFamily: montserrat.style.fontFamily,
            fontWeight: theme.typography.fontWeightBold
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: 'clamp(3rem, 10vw, 3rem)',
            fontFamily: montserrat.style.fontFamily,
            whiteSpace: 'nowrap'
          },
          formControl: {
            [`${theme.breakpoints.down(760)}`]: {
              transform: 'translate(0, 0) scale(0.35)'
            }
          },
          shrink: {
            transform: 'translate(0, 0) scale(0.35)'
          }
        }
      }
    }
  });

export const appSearchStyles = makeStyles()((theme) => ({
  root: {},

  title: {
    flexGrow: 1,
    color: 'currentColor',
    fontSize: '2rem'
  },

  searchForm: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(40)}`,
    fontSize: '5rem'
  },

  query: {
    maxWidth: '800px'
  }
}));
