/**
 * @file _app.tsx
 * Override the main app component.
 */

import React, { useEffect } from 'react';
import App, { AppContext as NextAppContext, AppProps } from 'next/app';
import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { IPriApiResource } from 'pri-api-library/types';
import { IButton } from '@interfaces/button';
import { ICtaMessage } from '@interfaces/cta';
import { AppContext } from '@contexts/AppContext';
import { AppCtaBanner } from '@components/AppCtaBanner';
import { AppCtaLoadUnder } from '@components/AppCtaLoadUnder';
import { AppHeader } from '@components/AppHeader';
import { AppFooter } from '@components/AppFooter';
import { wrapper } from '@store';
import { fetchAppData, fetchCtaData } from '@store/actions';
import { baseMuiTheme, appTheme } from '@theme/App.theme';
import { getCtaContext } from '@store/reducers';

interface TwAppProps extends AppProps {
  ctaRegions?: {
    banner?: ICtaMessage[];
    loadUnder?: ICtaMessage[];
  };
  latestStories?: IPriApiResource[];
  menus?: {
    [K: string]: IButton[];
  };
}

const TwApp = ({ Component, pageProps }: TwAppProps) => {
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
  const {
    pageProps: { type, id }
  } = initialProps;
  const context = getCtaContext(store.getState(), type, id);

  // Fetch App Data
  await store.dispatch<any>(fetchAppData(req));

  // // Fetch CTA Messages
  await store.dispatch<any>(
    fetchCtaData('tw_cta_regions_site', type, id, context, req)
  );

  return {
    ...initialProps
  };
};

export default wrapper.withRedux(TwApp); // eslint-disable-line import/no-default-export
