/**
 * @file _app.tsx
 * Override the main app component.
 */

import React, { useEffect } from 'react';
import App, { AppContext as NextAppContext, AppProps } from 'next/app';
import { useStore } from 'react-redux';
import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppContext } from '@contexts/AppContext';
import { AppCtaBanner } from '@components/AppCtaBanner';
import { AppCtaLoadUnder } from '@components/AppCtaLoadUnder';
import { AppHeader } from '@components/AppHeader';
import { AppFooter } from '@components/AppFooter';
import { AppLoadingBar } from '@components/AppLoadingBar';
import { wrapper } from '@store';
import { fetchAppData, fetchCtaData } from '@store/actions';
import { baseMuiTheme, appTheme } from '@theme/App.theme';
import { getCtaContext } from '@store/reducers';

interface TwAppProps extends AppProps {}

const TwApp = ({ Component, pageProps }: TwAppProps) => {
  const store = useStore();
  const { type, id } = pageProps;
  const contextValue = {
    page: {
      resource: {
        type,
        id
      }
    }
  };

  useEffect(() => {
    (async () => {
      // Fetch CTA Messages
      const context = getCtaContext(store.getState(), type, id);
      await store.dispatch<any>(
        fetchCtaData('tw_cta_regions_site', type, id, context)
      );
    })();
  });

  useEffect(() => {
    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={baseMuiTheme}>
      <ThemeProvider theme={appTheme}>
        <AppContext.Provider value={contextValue}>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <AppLoadingBar />
            <AppCtaBanner />
            <AppHeader />
            <Box flexGrow={1}>
              <Component {...pageProps} />
            </Box>
            <AppFooter />
            <AppCtaLoadUnder />
          </Box>
        </AppContext.Provider>
        <CssBaseline />
      </ThemeProvider>
    </ThemeProvider>
  );
};

TwApp.getInitialProps = async (ctx: NextAppContext) => {
  const { req, store } = ctx.ctx;
  const initialProps = await App.getInitialProps(ctx);

  store.dispatch({ type: 'LOADING_APP_DATA' });

  // Fetch App Data
  await store.dispatch<any>(fetchAppData(req));

  store.dispatch({ type: 'LOADING_COMPLETE' });

  return {
    ...initialProps,
    store
  };
};

export default wrapper.withRedux(TwApp); // eslint-disable-line import/no-default-export
