/**
 * @file AppLoadingBar.style.ts
 * Styles for AppLoadingBar.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const appLoadingBarTheme = (theme: Theme) =>
  createTheme(theme, {
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          dashed: {
            animation: 'none'
          },
          dashedColorSecondary: {
            background: alpha(theme.palette.info.main, 0.6),
            backgroundImage: 'none'
          }
        }
      }
    }
  });

export const appLoadingBarStyles = makeStyles()(theme => ({
  root: {
    transition: 'transform 400ms ease-out, width 800ms ease-out',
    transform: 'translateY(-100%)',
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: theme.zIndex.modal
  },

  isLoading: {
    transform: 'translateY(0)'
  },

  'stage--alias-data': {
    width: '25%'
  },

  'stage--content-data': {
    width: '85%'
  },

  'stage--app-data': {
    width: '100%'
  }
}));
