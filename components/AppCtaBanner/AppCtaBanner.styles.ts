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
import { blue } from '@theme/colors';

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
      MuiPaper: {
        root: {
          backgroundColor: blue[700],
          color: theme.palette.getContrastText(blue[700])
        }
      },
      MuiToolbar: {
        root: {
          justifyContent: 'center',
          marginTop: theme.spacing(3),
          '& > * + *': {
            marginLeft: theme.spacing(2)
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
    }
  })
);
