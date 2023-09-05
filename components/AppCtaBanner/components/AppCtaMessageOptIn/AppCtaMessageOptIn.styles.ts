/**
 * @file AppCtaMessageOptIn.style.ts
 * Styles for AppCtaMessageOptIn.
 */

import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { blue } from '@theme/colors';

export const appCtaMessageOptInStyles = makeStyles()((theme: Theme) => ({
  root: {
    '.MuiPaper-root': {
      backgroundColor: blue[700],
      color: theme.palette.getContrastText(blue[700])
    }
  }
}));
