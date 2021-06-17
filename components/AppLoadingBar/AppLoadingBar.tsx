/**
 * @file AppLoadingBar.tsx
 * Component for showing loading progress of data requests.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { LinearProgress } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  appLoadingBarStyles,
  appLoadingBarTheme
} from './AppLoadingBar.styles';

export const AppLoadingBar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const classes = appLoadingBarStyles({});
  const cx = classNames.bind(classes);
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
