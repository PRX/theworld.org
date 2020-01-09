/**
 * @file App.theme.tsx
 * Theme and styles for App layout.
 */

import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { blue, orange, red, grey } from './colors';

export const headingProps = {
  fontFamily:
    '"Montserrat","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
  fontWeight: 700
};

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600]
    },
    secondary: {
      main: orange[500]
    },
    error: {
      main: red[500]
    },
    grey: grey,
    common: {
      black: grey[900]
    }
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
    }
  }
});
