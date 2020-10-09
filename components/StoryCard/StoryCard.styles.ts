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

export const storyCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    link: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    overline: {
      position: 'relative',
      zIndex: 1
    }
  })
);

export const storyCardTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      h5: {
        lineHeight: 1.1
      },
      overline: {
        display: 'block',
        fontFamily:
          '"Open Sans","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
        letterSpacing: 'unset',
        textTransform: 'unset'
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
        root: {}
      },
      MuiTypography: {
        gutterBottom: {
          marginBottom: theme.typography.pxToRem(theme.spacing(1.5))
        }
      }
    }
  });
