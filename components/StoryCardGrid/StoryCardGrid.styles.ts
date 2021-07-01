/**
 * @file StoryCardGrid.style.tsx
 * Styles for Story Card Grid.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const storyCardGridStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: `${theme.spacing(2)}px`
      },
      [theme.breakpoints.up('sm')]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: `${theme.spacing(2)}px`,
        '& > * + *': {
          marginTop: 0
        }
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
    }
  })
);

export const storyCardGridTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      h5: {
        fontSize: theme.typography.pxToRem(16)
      }
    },
    overrides: {
      MuiCardActionArea: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          height: '100%',
          [theme.breakpoints.down('xs')]: {
            display: 'grid',
            gridTemplateColumns: '100px 1fr',
            gridGap: `${theme.spacing(2)}px`,
            padding: `${theme.spacing(2)}px`
          }
        }
      },
      MuiCardContent: {
        root: {
          [theme.breakpoints.down('xs')]: {
            padding: 0
          }
        }
      },
      MuiCardMedia: {
        root: {
          height: 'auto',
          paddingTop: 'initial'
        }
      }
    }
  });
