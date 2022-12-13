/**
 * @file AppCtaMessageOptIn.style.ts
 * Styles for AppCtaMessageOptIn.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { blue } from '@theme/colors';

export const appCtaMessageOptInTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: blue[700],
          color: theme.palette.getContrastText(blue[700])
        }
      }
    }
  });

export const appCtaMessageOptInStyles = makeStyles((theme: Theme) =>
  createStyles({
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
