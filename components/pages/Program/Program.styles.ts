/**
 * @file Program.theme.tsx
 * Theme and styles for Program layout.
 */

import {
  createTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { storyLayoutStyles } from '@components/pages/Story/layouts/default/styles/Story.layout';
import { storyBodyStyles } from '@components/pages/Story/layouts/default/styles/Story.body';

export const programTheme = (theme: Theme) =>
  createTheme(theme, {
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

export const programStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...storyLayoutStyles(theme),
    ...storyBodyStyles(theme)
  })
);
