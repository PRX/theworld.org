/**
 * @file Episode.theme.tsx
 * Theme and styles for Episode layout.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { storyLayoutStyles } from '@components/Story/layouts/default/styles/Story.layout';
import { storyBodyStyles } from '@components/Story/layouts/default/styles/Story.body';

export const episodeTheme = (theme: Theme) =>
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

export const episodeStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...storyLayoutStyles(theme),
    ...storyBodyStyles(theme)
  })
);
