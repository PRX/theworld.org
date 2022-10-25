/**
 * @file _app.tsx
 * Override the main app component.
 */

import React, { FC, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { AppProps } from 'next/app';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider, Box, CssBaseline } from '@material-ui/core';
import { analytics } from '@config';
import { AppCtaBanner } from '@components/AppCtaBanner';
import { AppCtaLoadUnder } from '@components/AppCtaLoadUnder';
import { AppFooter } from '@components/AppFooter';
import { AppHeader } from '@components/AppHeader';
import { AppLoadingBar } from '@components/AppLoadingBar';
import { AppSearch } from '@components/AppSearch';
import { AppContext } from '@contexts/AppContext';
import { SocialShareMenu } from '@components/SocialShareMenu/SocialShareMenu';
import { baseMuiTheme, appTheme } from '@theme/App.theme';
import { wrapper } from '@store';

const TwApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const store = useStore();
  const [, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const [plausibleDomain, setPlausibleDomain] = useState(null);
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
    setPlausibleDomain((window as any)?.location.hostname || analytics.domain);

    // Remove the server-side injected CSS.
    // Fix for https://github.com/mui-org/material-ui/issues/15073
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    return () => {
      unsub();
    };
  }, []);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0 });
  //   // Fetch CTA messages for this resource.
  //   (async () => {
  //     await Promise.all([
  //       // Fetch App data (latest stories, menus, etc.)
  //       store.dispatch<any>(fetchAppData()),
  //       // Fetch CTAs.
  //       store.dispatch<any>(fetchCtaData(type, id, 'tw_cta_regions_site'))
  //     ]);
  //   })();
  // }, [type, id]);

  return (
    <ThemeProvider theme={baseMuiTheme}>
      <ThemeProvider theme={appTheme}>
        <AppContext.Provider value={contextValue}>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <AppLoadingBar />
            <AppCtaBanner />
            <AppHeader />
            <Box flexGrow={1}>
              <PlausibleProvider
                domain={plausibleDomain}
                selfHosted
                trackOutboundLinks
                enabled={!!plausibleDomain}
              >
                <Component {...pageProps} />
              </PlausibleProvider>
            </Box>
            <AppFooter />
            <AppSearch />
            <AppCtaLoadUnder />
            <SocialShareMenu />
          </Box>
        </AppContext.Provider>
        <CssBaseline />
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(TwApp); // eslint-disable-line import/no-default-export
