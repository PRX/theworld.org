/**
 * @file Page.styles.tsx
 * Theme and styles for Page layout.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const pageTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      h1: {
        fontSize: theme.typography.pxToRem(46)
      },
      h4: {
        fontSize: theme.typography.pxToRem(20),
        marginBottom: theme.typography.pxToRem(theme.spacing(2))
      }
    },
    overrides: {
      MuiDivider: {
        root: {
          marginBottom: theme.typography.pxToRem(theme.spacing(3))
        }
      }
    }
  });

export const pageStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...storyBodyStyles(theme)
  })
);
