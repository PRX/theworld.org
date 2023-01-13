/**
 * @file AppCtaMessageOptIn.style.ts
 * Styles for AppCtaMessageOptIn.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { blue } from '@theme/colors';

export const appCtaMessageOptInTheme = (theme: Theme) =>
  createTheme(theme, {
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: blue[700],
            color: theme.palette.getContrastText(blue[700])
          }
        }
      }
    }
  });

export const appCtaMessageOptInStyles = makeStyles<void, 'controls'>()(
  theme => ({
    root: {},

    controls: {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: '1fr max-content',
        alignItems: 'center'
      }
    }
  })
);
