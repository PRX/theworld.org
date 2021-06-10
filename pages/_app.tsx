/**
 * @file _app.tsx
 * Override the main app component.
 */

import React, { FC, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, Box, CssBaseline } from '@material-ui/core';
// import { AppCtaBanner } from '@components/AppCtaBanner';
// import { AppCtaLoadUnder } from '@components/AppCtaLoadUnder';
import { AppFooter } from '@components/AppFooter';
import { AppHeader } from '@components/AppHeader';
import { AppLoadingBar } from '@components/AppLoadingBar';
import { AppContext } from '@contexts/AppContext';
import { baseMuiTheme, appTheme } from '@theme/App.theme';
import { wrapper } from '@store';

const TwApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [type, id]);

  return (
    <ThemeProvider theme={baseMuiTheme}>
      <ThemeProvider theme={appTheme}>
        <AppContext.Provider value={contextValue}>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <AppLoadingBar />
            {/* <AppCtaBanner /> */}
            <AppHeader />
            <Box flexGrow={1}>
              <Component {...pageProps} />
            </Box>
            <AppFooter />
            {/* <AppCtaLoadUnder /> */}
          </Box>
        </AppContext.Provider>
        <CssBaseline />
      </ThemeProvider>
    </ThemeProvider>
  );
};

// TwApp.getInitialProps = wrapper.getInitialAppProps(
//   store => async ({ Component, ctx }) => {
//     const { req } = ctx;

//     store.dispatch({ type: 'LOADING_APP_DATA' });

//     // Fetch App Data
//     await store.dispatch<any>(fetchAppData(req));

//     return {
//       pageProps: {
//         // Call page-level getInitialProps
//         // DON'T FORGET TO PROVIDE STORE TO PAGE
//         ...(Component.getInitialProps
//           ? await Component.getInitialProps({ ...ctx, store })
//           : {})
//       }
//     };
//   }
// );

// class MyApp extends App<AppInitialProps> {
//   public static getInitialProps = wrapper.getInitialAppProps(
//     store => async ({ Component, ctx }) => {
//       store.dispatch({ type: 'TOE', payload: 'was set in _app' });

//       return {
//         pageProps: {
//           // Call page-level getInitialProps
//           // DON'T FORGET TO PROVIDE STORE TO PAGE
//           ...(Component.getInitialProps
//             ? await Component.getInitialProps({ ...ctx, store })
//             : {}),
//           // Some custom thing for all pages
//           pathname: ctx.pathname
//         }
//       };
//     }
//   );

//   public render() {
//     const { Component, pageProps } = this.props;
//     const { type, id } = pageProps;
//     const contextValue = {
//       page: {
//         resource: {
//           type,
//           id
//         }
//       }
//     };

//     return (
//       <ThemeProvider theme={baseMuiTheme}>
//         <ThemeProvider theme={appTheme}>
//           <AppContext.Provider value={contextValue}>
//             <Box minHeight="100vh" display="flex" flexDirection="column">
//               <AppLoadingBar />
//               <AppCtaBanner />
//               <AppHeader />
//               <Box flexGrow={1}>
//                 <Component {...pageProps} />
//               </Box>
//               <AppFooter />
//               <AppCtaLoadUnder />
//             </Box>
//           </AppContext.Provider>
//           <CssBaseline />
//         </ThemeProvider>
//       </ThemeProvider>
//     );
//   }
// }

export default wrapper.withRedux(TwApp); // eslint-disable-line import/no-default-export
