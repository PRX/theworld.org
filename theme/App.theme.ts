/**
 * @file App.theme.tsx
 * Theme and styles for App layout.
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { common } from '@material-ui/core/colors';
import { blue, orange, red, grey } from './colors';

const buttonBorderRadius = '3px';
const buttonBorderWidth = '2px';

export const headingProps = {
  color: blue[900],
  fontFamily:
    '"Montserrat","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
  fontWeight: 700
};

export const baseMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
      dark: blue[800]
    },
    secondary: {
      light: orange[400],
      main: orange[500],
      dark: orange[700],
      contrastText: common.black
    },
    error: {
      main: red[500]
    },
    grey,
    common: {
      black: grey[900]
    },
    background: {
      default: grey.A100
    }
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    fontFamily:
      '"Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
    caption: {
      color: grey[700],
      fontSize: '0.9rem',
      lineHeight: '1.35rem'
    },
    h1: {
      ...headingProps
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

export const appTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    shadows: (() => {
      const shadows = [...theme.shadows] as Theme['shadows'];
      shadows[1] = `0 1px 1px 0 ${theme.palette.divider}, 0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)`;
      return shadows;
    })(),
    overrides: {
      MuiAppBar: {
        root: {
          boxShadow: 'none'
        }
      },
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
      },
      MuiLink: {
        root: {
          color: theme.palette.primary.main,
          '&:visited': {
            color: theme.palette.primary.main
          },
          '&:hover': {
            color: theme.palette.primary.dark
          }
        }
      }
    }
  });
