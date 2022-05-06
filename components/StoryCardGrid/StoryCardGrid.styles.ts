/**
 * @file StoryCardGrid.style.tsx
 * Styles for Story Card Grid.
 */

import {
  createTheme,
  createStyles,
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
    title: {
      fontSize: theme.typography.pxToRem(16)
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
          alignItems: 'center',
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
          alignSelf: 'center',
          height: 'auto',
          paddingTop: '100%'
        }
      }
    }
  });
