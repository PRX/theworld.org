/**
 * @file Team.styles.tsx
 * Theme and styles for Team layout.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const teamTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h1: {
        fontSize: theme.typography.pxToRem(46)
      },
      h4: {
        fontSize: theme.typography.pxToRem(20)
      }
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            height: '100%',
            color: theme.palette.primary.main
          }
        }
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'stretch',
            height: '100%'
          }
        }
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            position: 'relative',
            width: '100%',
            paddingTop: '100%'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            position: 'relative',
            overflow: 'hidden',
            color: theme.palette.text.primary
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginBottom: theme.typography.pxToRem(24)
          }
        }
      }
    }
  });

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const teamStyles = makeStyles<void, 'isLoading'>()(
  (theme: Theme, _params, classes) => ({
    imageWrapper: {
      paddingTop: '100%'
    },
    link: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      textIndent: '-2000vw'
    },
    loadingBar: {
      transition: 'transform 400ms ease-out',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transform: 'translateY(-100%)',
      [`.${classes.isLoading} &`]: {
        transform: 'translateY(0)'
      }
    },
    isLoading: {
      boxShadow: theme.shadows[5]
    }
  })
);
