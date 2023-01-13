/**
 * @file NewsletterForm.style.ts
 * Styles for NewsletterForm.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const newsletterFormTheme = (theme: Theme) => {
  const tempTheme = createTheme({
    ...theme,
    palette: {
      primary: {
        ...theme.palette.success,
        contrastText: theme.palette.common.white
      }
    }
  });

  return createTheme({
    ...tempTheme,
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: theme.palette.grey[700]
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: theme.palette.grey[700]
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            [theme.breakpoints.down('xs')]: {
              width: '100%'
            },
            '&:hover': {
              backgroundColor: tempTheme.palette.primary.dark
            }
          },
          contained: {
            whiteSpace: 'nowrap'
          }
        }
      }
    }
  });
};

export const newsletterFormStyles = makeStyles<{ compact: boolean }>()(
  (theme, { compact }) => ({
    root: {
      flexGrow: 1,
      textAlign: 'initial',
      '& a': {
        color: theme.palette.success.dark,
        '&:hover': {
          color: theme.palette.success.main
        },
        '&:visited': {
          color: theme.palette.success.dark,
          '&:hover': {
            color: theme.palette.success.main
          }
        }
      }
    },

    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr min-content',
      alignItems: 'center',
      gridGap: theme.spacing(compact ? 1 : 2),
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: compact ? '1fr min-content' : '1fr',
        justifyContent: 'stretch'
      }
    },

    optin: {
      gridColumn: '1 / -1',
      marginTop: `-${theme.spacing(compact ? 1 : 2)}`,
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(1)
      }
    }
  })
);
