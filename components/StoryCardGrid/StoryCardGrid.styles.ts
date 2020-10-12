/**
 * @file StoryRelatedLinks.default.style.tsx
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
      margin: `${theme.spacing(2)}px 0`,
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
          [theme.breakpoints.down('xs')]: {
            display: 'grid',
            gridTemplateColumns: `${100}px 1fr`,
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
          [theme.breakpoints.down('xs')]: {
            paddingTop: '100%'
          }
        }
      }
    }
  });
