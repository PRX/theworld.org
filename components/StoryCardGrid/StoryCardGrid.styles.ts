/**
 * @file StoryCardGrid.style.tsx
 * Styles for Story Card Grid.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

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
      gap: theme.typography.pxToRem(6)
    },
    title: {
      fontSize: theme.typography.pxToRem(16)
    },
    audio: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      gap: theme.typography.pxToRem(4),
      alignItems: 'center',
      fontSize: '1.25rem'
    },
    audioPlayButton: {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      fontSize: '5rem',
      padding: 0,
      borderRadius: 0,
      backgroundColor: 'transparent',
      color: alpha(theme.palette.primary.contrastText, 0.7),
      '&:hover': {
        backgroundColor: 'transparent',
        color: alpha(theme.palette.primary.contrastText, 1)
      }
    }
  })
);

export const storyCardGridTheme = (theme: Theme) =>
  createTheme(theme, {
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
          backgroundColor: theme.palette.primary.main
        }
      },
      MuiCircularProgress: {
        root: {
          padding: '20%'
        }
      }
    }
  });
