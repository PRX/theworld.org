/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import App, { AppContext as NextAppContext, AppProps } from 'next/app';
import classNames from 'classnames/bind';
import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { IPriApiResource } from 'pri-api-library/types';
import { IButton } from '@interfaces/button';
import { AppContext } from '@contexts/AppContext';
import { AppHeader } from '@components/AppHeader';
import { AppFooter } from '@components/AppFooter';
import { fetchApiApp } from '@lib/fetch/api';
import { baseMuiTheme, appTheme } from '@theme/App.theme';

interface TwAppProps extends AppProps {
  latestStories?: IPriApiResource[];
  menus?: {
    [K: string]: IButton[];
  };
}

interface TwAppState {
  javascriptDisabled: boolean;
}

class TwApp extends App<TwAppProps, {}, TwAppState> {
  static async getInitialProps(ctx: NextAppContext) {
    const { req } = ctx.ctx;
    const initialProps = await App.getInitialProps(ctx);

    // Fetch Menus
    const data = await fetchApiApp(req);

    return {
      ...initialProps,
      ...data
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      javascriptDisabled: true
    };
  }

  componentDidMount() {
    // Flag javascript as enabled.
    this.setState({
      javascriptDisabled: false
    });

    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, menus, latestStories } = this.props;
    const { javascriptDisabled } = this.state;
    const cx = classNames.bind({
      noJs: 'no-js'
    });
    const appClasses = cx({
      noJs: javascriptDisabled
    });

    return (
      <ThemeProvider theme={baseMuiTheme}>
        <ThemeProvider theme={appTheme}>
          <AppContext.Provider value={{ latestStories, menus }}>
            <Box
              className={appClasses}
              minHeight="100vh"
              display="flex"
              flexDirection="column"
            >
              <AppHeader />
              <Box flexGrow={1}>
                <Component {...pageProps} />
              </Box>
              <AppFooter />
            </Box>
          </AppContext.Provider>
          <CssBaseline />
        </ThemeProvider>
      </ThemeProvider>
    );
  }
}

export default TwApp; // eslint-disable-line import/no-default-export
