/**
 * @file AppLoadingBar.tsx
 * Component for showing loading progress of data requests.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import {
  appLoadingBarStyles,
  appLoadingBarTheme
} from './AppLoadingBar.styles';

export const AppLoadingBar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { classes, cx } = appLoadingBarStyles();
  const className = cx(classes.root, {
    [classes.isLoading]: isLoading
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    const handleRouteChangeEnd = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, []);

  return (
    <ThemeProvider theme={appLoadingBarTheme}>
      <LinearProgress
        color="secondary"
        variant="indeterminate"
        className={className}
        aria-label="Progress Bar"
      />
    </ThemeProvider>
  );
};
