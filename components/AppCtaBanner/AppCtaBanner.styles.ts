/**
 * @file appCtaBanner.style.ts
 * Styles for appCtaBanner.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const appCtaBannerTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      h3: {
        fontSize: '1.5rem'
      },
      body1: {
        fontSize: '1.1rem',
        lineHeight: 1.4
      }
    },
    overrides: {
      MuiButton: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: theme.palette.secondary.main
          }
        },
        outlinedPrimary: {
          color: theme.palette.secondary.main,
          '&:hover': {
            borderColor: theme.palette.secondary.main
          },
          '& $label': {
            color: theme.palette.getContrastText(theme.palette.primary.dark)
          }
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
          '& > * + *': {
            marginLeft: '1rem'
          }
        }
      }
    }
  });

export const appCtaBannerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: theme.typography.fontWeightBold
    },
    message: {
      fontSize: '1.1rem',
      lineHeight: 1.4
    },
    actions: {
      '& * + *': {
        marginLeft: '1rem'
      }
    }
  })
);
