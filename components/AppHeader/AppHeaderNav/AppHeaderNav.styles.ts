/**
 * @file AppHeaderNav.style.ts
 * Styles for AppHeaderNav.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const appHeaderNavTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiButton: {
        text: {
          color: theme.palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightBold,
          '&:hover, &:focus': {
            backgroundColor: addCssColorAlpha(
              theme.palette.primary.contrastText,
              0.1
            )
          }
        }
      }
    }
  });

export const appHeaderNavStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      columnGap: theme.typography.pxToRem(theme.spacing(1))
    }
  })
);
