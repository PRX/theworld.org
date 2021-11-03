/**
 * @file AppLoadingBar.style.ts
 * Styles for AppLoadingBar.
 */

import {
  createStyles,
  makeStyles,
  createTheme,
  Theme
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const appLoadingBarTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiLinearProgress: {
        dashed: {
          animation: 'none'
        },
        dashedColorSecondary: {
          background: addCssColorAlpha(theme.palette.info.main, 0.6),
          backgroundImage: 'none'
        }
      }
    }
  });

export const appLoadingBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transition: 'transform 400ms ease-out, width 800ms ease-out',
      transform: 'translateY(-100%)',
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      // height: '5px',
      zIndex: theme.zIndex.modal
      // backgroundColor: theme.palette.secondary.main
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
  })
);
