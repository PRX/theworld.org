/**
 * @file App.theme.tsx
 * Theme and styles for App layout.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { common } from '@material-ui/core/colors';
import { blue, orange, red, grey } from './colors';

const buttonBorderRadius = '3px';
const buttonBorderWidth = '2px';

export const headingProps = {
  fontFamily:
    '"Montserrat","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
  fontWeight: 700
};

const baseMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600]
    },
    secondary: {
      light: orange[400],
      main: orange[500],
      contrastText: common.white
    },
    error: {
      main: red[500]
    },
    grey: grey,
    common: {
      black: grey[900]
    }
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    fontFamily:
      '"Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
    caption: {
      fontSize: '0.9rem',
      lineHeight: '1.35rem'
    },
    h1: {
      ...headingProps,
      color: blue[900]
    },
    h2: {
      ...headingProps
    },
    h3: {
      ...headingProps
    },
    h4: {
      ...headingProps
    },
    h5: {
      ...headingProps
    },
    h6: {
      ...headingProps
    },
    overline: {
      fontSize: '0.875rem',
      fontWeight: 'bold',
      letterSpacing: '0.1rem',
      lineHeight: '1.25rem'
    }
  }
});

export const appTheme = ((theme: Theme) =>
  createMuiTheme(
    {
      overrides: {
        MuiButton: {
          contained: {
            fontWeight: 'bold'
          },
          label: {
            textTransform: 'none'
          }
        },
        MuiButtonGroup: {
          contained: {
            boxShadow: 'none'
          },
          groupedContained: {
            whiteSpace: 'nowrap',
            '&:first-child': {
              borderRadius: `${buttonBorderRadius} 0 0 ${buttonBorderRadius}`
            },
            '&:last-child': {
              borderRadius: `0 ${buttonBorderRadius} ${buttonBorderRadius} 0`
            }
          },
          groupedContainedSecondary: {
            border: `${buttonBorderWidth} solid ${theme.palette.secondary.light}`,
            '&:not(:last-child)': {
              borderRight: `${buttonBorderWidth} solid ${theme.palette.secondary.light}`,
              borderColor: `${theme.palette.secondary.light}`
            },
            '& + *': {
              marginLeft: `-${buttonBorderWidth}`
            },
            '&:hover, &:focus': {
              backgroundColor: theme.palette.secondary.light,
              boxShadow: 'none'
            }
          }
        },
        MuiDrawer: {
          paper: {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main
          }
        },
        MuiIconButton: {
          root: {
            borderRadius: 0
          }
        }
      }
    },
    theme
  ))(baseMuiTheme);

export const appStyles = makeStyles((theme: Theme) =>
  createStyles({
    noJs: {}
  })
);
