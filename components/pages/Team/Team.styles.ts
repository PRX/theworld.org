/**
 * @file Team.styles.tsx
 * Theme and styles for Team layout.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const teamTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      h1: {
        fontSize: theme.typography.pxToRem(46)
      },
      h4: {
        fontSize: theme.typography.pxToRem(20)
      }
    },
    overrides: {
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
          justifyContent: 'start',
          alignItems: 'stretch',
          height: '100%'
        }
      },
      MuiCardMedia: {
        root: {
          position: 'relative',
          width: '100%'
        }
      },
      MuiCardContent: {
        root: {
          position: 'relative',
          overflow: 'hidden',
          color: theme.palette.text.primary
        }
      },
      MuiDivider: {
        root: {
          marginBottom: theme.typography.pxToRem(theme.spacing(3))
        }
      }
    }
  });

export const teamStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageWrapper: {
      paddingTop: '100%'
    },
    link: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      textIndent: '-2000vw'
    },
    loadingBar: {
      transition: 'transform 400ms ease-out',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transform: 'translateY(-100%)',
      '$isLoading &': {
        transform: 'translateY(0)'
      }
    },
    isLoading: {
      boxShadow: theme.shadows[5]
    }
  })
);
