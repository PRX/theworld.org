/**
 * @file StoryRelatedLinks.default.style.tsx
 * Styles for default Story layout.
 */

import {
  createTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const storyRelatedLinksStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3)
    }
  })
);

export const storyRelatedLinksTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h5: {
        fontSize: 'inherit'
      }
    },
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
          position: 'relative',
          paddingTop: `${100 / (16 / 9)}%`
        }
      }
    }
  });
