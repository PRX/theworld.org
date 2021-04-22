/**
 * @file AppLoadingBar.tsx
 * Component for showing loading progress of data requests.
 */

import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import classNames from 'classnames';
import { LinearProgress } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  appLoadingBarStyles,
  appLoadingBarTheme
} from './AppLoadingBar.styles';

export const AppLoadingBar = () => {
  const store = useStore();
  const [loading, setLoading] = useState(store.getState().loading);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [wasLoading, setWasLoading] = useState(false);
  const unsub = store.subscribe(() => {
    setLoading(store.getState().loading);
  });
  const isLoading = !!loading.stage;
  const classes = appLoadingBarStyles({});
  const cx = classNames.bind(classes);
  const className = cx(classes.root, {
    [classes.isLoading]: isLoading || wasLoading
  });

  useEffect(() => {
    if (!isLoading && !wasLoading) {
      setTimeout(() => {
        setBuffer(0);
        setProgress(0);
      }, 1000);
    }
  });

  useEffect(() => {
    const incProgress = setInterval(() => {
      const inc = 5 * Math.random();
      if (isLoading) {
        setWasLoading(true);
        setProgress(Math.min(progress + inc, 100));
      } else if (wasLoading) {
        setTimeout(() => {
          setWasLoading(false);
        }, 1000);
      }
    }, 1000);

    return () => {
      clearInterval(incProgress);
      unsub();
    };
  }, [progress, buffer, isLoading]);

  useEffect(() => {
    switch (loading.stage) {
      case 'alias-data':
        setBuffer(25);
        setProgress(0);
        break;

      case 'content-data':
        setBuffer(85);
        setProgress(Math.max(25, progress));
        break;

      case 'app-data':
        setBuffer(100);
        setProgress(Math.max(85, progress));
        break;

      default:
        setBuffer(100);
        setProgress(100);
        break;
    }
  }, [loading.stage]);

  return (
    <ThemeProvider theme={appLoadingBarTheme}>
      <LinearProgress
        color="secondary"
        variant={progress === 100 && isLoading ? 'indeterminate' : 'buffer'}
        value={progress}
        valueBuffer={buffer}
        className={className}
      />
    </ThemeProvider>
  );
};
