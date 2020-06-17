/**
 * @file AppCtaMessageOptIn.style.ts
 * Styles for AppCtaMessageOptIn.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { blue } from '@theme/colors';

export const appCtaMessageOptInTheme = (theme: Theme) =>
  createMuiTheme(theme, {
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
