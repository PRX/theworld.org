/**
 * @file QuickLinks.style.ts
 * Styles for QuickLinks.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const QuickLinksTheme = (theme: Theme) =>
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

export const QuickLinksStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      columnGap: theme.typography.pxToRem(theme.spacing(1))
    }
  })
);
