/**
 * @file StoryRelatedLinks.default.style.tsx
 * Styles for default Story layout.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const storyRelatedLinksStyles = makeStyles(() =>
  createStyles({
    root: {}
  })
);

export const storyRelatedLinksTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiButtonBase: {
        root: {
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }
      },
      MuiCard: {
        root: {
          height: '100%',
          color: theme.palette.primary.main
        }
      },
      MuiCardActionArea: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'start',
          height: '100%'
        }
      },
      MuiCardContent: {
        root: {
          color: theme.palette.text.primary,
          fontWeight: theme.typography.fontWeightBold
        }
      },
      MuiCardMedia: {
        root: {
          height: theme.typography.pxToRem(130)
        }
      }
    }
  });