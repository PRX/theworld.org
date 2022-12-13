/**
 * @file AppCtaLoadUnder.style.ts
 * Styles for AppCtaLoadUnder.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const appCtaLoadUnderTheme = (theme: Theme) =>
  createMuiTheme(theme, {
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
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
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
          '& > * + *': {
            marginLeft: theme.spacing(2)
          },
          [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1)
          }
        }
      }
    }
  });

export const appCtaLoadUnderStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);
