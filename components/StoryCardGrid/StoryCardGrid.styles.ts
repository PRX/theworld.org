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
        display: 'grid',
        marginTop: 0
      },
      [theme.breakpoints.up('sm')]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        marginTop: 0,
        gridGap: 0,
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
    overrides: {
      MuiCard: {
        root: {
          borderTop: `1px solid ${theme.palette.grey[200]}`,
          '&:nth-child( odd )': {
            borderRight: `1px solid ${theme.palette.grey[200]}`
          }
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
          paddingTop: `${100 / (1 / 1)}%`
        }
      }
    }
  });
