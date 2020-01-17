/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import App from 'next/app';
// Material Components
import {
  Box,
  CssBaseline
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import {
  ThemeProvider
} from '@material-ui/core/styles';
// Theme
import { appTheme } from '@theme/App.theme';
import AppHeader from '@components/AppHeader/AppHeader';

class TwApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    console.log(jssStyles);
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={appTheme}>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <AppHeader/>
          <Box flexGrow={1}>
            <Component {...pageProps} />
          </Box>
          <Box height={350} bgcolor={grey.A100} mt={3} />
        </Box>
        <CssBaseline />
      </ThemeProvider>
    );
  }
}

export default TwApp;
