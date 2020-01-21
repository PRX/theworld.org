/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import Document from 'next/document';
import App, { AppContext, AppProps } from 'next/app';
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
// API
import { fetchPriApiQueryMenu } from '@lib/fetch';
import { PriApiResource } from 'pri-api-library/types';
// Contexts
import {default as TwAppContext} from '@contexts/AppContext';

interface TwAppProps extends AppProps {
  menus?: PriApiResource[]
}

class TwApp extends App<TwAppProps> {
  static async getInitialProps(ctx: AppContext) {

    const initialProps = await App.getInitialProps(ctx);

    // Fetch Menus
    const [
      drawerMainNav,
      drawerSocialnav,
      drawerTopNav,
      footerNav,
      headerNav
    ] = await Promise.all([
      fetchPriApiQueryMenu('menu-drawer-main-nav'),
      fetchPriApiQueryMenu('menu-drawer-social-nav'),
      fetchPriApiQueryMenu('menu-drawer-top-nav'),
      fetchPriApiQueryMenu('menu-footer-nav'),
      fetchPriApiQueryMenu('menu-header-nav')
    ])

    return {
      ...initialProps,
      menus: {
        drawerMainNav,
        drawerSocialnav,
        drawerTopNav,
        footerNav,
        headerNav
      }
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, menus } = this.props;

    console.log(menus);

    return (
      <ThemeProvider theme={appTheme}>
        <TwAppContext.Provider value={{ menus }}>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <AppHeader/>
            <Box flexGrow={1}>
              <Component {...pageProps} />
            </Box>
            <Box height={350} bgcolor={grey.A100} mt={3} />
          </Box>
        </TwAppContext.Provider>
        <CssBaseline />
      </ThemeProvider>
    );
  }
}

export default TwApp;
