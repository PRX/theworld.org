/**
 * @file StoryCardGrid.style.tsx
 * Styles for Story Card Grid.
 */

import {
  createMuiTheme,
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const storyCardGridStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },
    loadingBar: {
      transition: 'transform 400ms ease-out',
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      transform: 'translateY(0)'
    },
    isLoading: {
      transform: 'translateY(-100%)'
    },
    heading: {
      display: 'flex',
      alignItems: 'start',
      gap: theme.typography.pxToRem(theme.spacing(0.75))
    },
    title: {
      fontSize: theme.typography.pxToRem(16)
    },
    audio: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      gap: theme.typography.pxToRem(theme.spacing(0.5)),
      alignItems: 'center',
      fontSize: '1.25rem'
    },
    audioPlayButton: {
      position: 'relative',
      zIndex: 1,
      fontSize: '5rem',
      padding: 0,
      borderRadius: 0,
      backgroundColor: 'transparent',
      color: fade(theme.palette.primary.contrastText, 0.7),
      '&:hover': {
        backgroundColor: 'transparent',
        color: fade(theme.palette.primary.contrastText, 1)
      }
    }
  })
);

export const storyCardGridTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {
      MuiCard: {
        root: {
          display: 'grid'
        }
      },
      MuiCardActionArea: {
        root: {
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: `${theme.spacing(2)}px`,
          alignItems: 'start',
          padding: `${theme.spacing(2)}px`
        }
      },
      MuiCardContent: {
        root: {
          padding: 0
        }
      },
      MuiCardMedia: {
        root: {
          alignSelf: 'start',
          aspectRatio: 1,
          display: 'grid',
          backgroundColor: theme.palette.primary.main,
          '& > *': {
            gridRow: '1 / -1',
            gridColumn: '1 / -1'
          }
        }
      }
    }
  });
