/**
 * @file StoryCard.style.tsx
 * Styles for story card.
 */

import {
  createTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const storyCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      marginTop: theme.typography.pxToRem(theme.spacing(1)),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.pxToRem(16),
        '$feature &': {
          fontSize: theme.typography.pxToRem(22)
        }
      }
    },
    teaser: {
      '$feature &': {
        fontSize: theme.typography.pxToRem(18)
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
        '$feature &': {
          display: 'initial'
        }
      }
    },
    imageWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      paddingTop: 'unset'
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
    loadingBar: ({ isLoading }: any) => ({
      transition: 'transform 400ms ease-out',
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      transform: `translateY(${!isLoading ? 0 : '-100%'})`
    }),
    MuiCardActionAreaRoot: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: `${theme.spacing(2)}px`,
      alignItems: 'start',
      padding: `${theme.spacing(2)}px`,
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '100px 1fr',
        alignItems: 'center'
      },
      '$noImage &': {},
      '$short &': {
        gridTemplateColumns: '1fr 2fr'
      },
      '$feature &': {
        display: 'flex',
        gridGap: 0,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'start',
        height: '100%',
        padding: 0
      }
    },
    MuiCardContentRoot: {
      overflow: 'hidden',
      padding: 0,
      '$feature &': {
        padding: `${theme.spacing(2)}px`
      }
    },
    MuiCardMediaRoot: {
      paddingTop: `${100 / (16 / 9)}%`,
      [theme.breakpoints.down('xs')]: {
        alignSelf: 'start'
      }
    },
    feature: {},
    short: {},
    isLoading: {},
    noImage: {}
  })
);

export const storyCardTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h5: {
        lineHeight: 1.1
      },
      overline: {
        display: 'block',
        position: 'relative',
        zIndex: 1,
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
          color: theme.palette.primary.main
        }
      },
      MuiCardActions: {
        root: {
          margin: 0,
          padding: 0
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
          overflow: 'hidden',
          width: '100%',
          background: theme.palette.grey[300]
        }
      },
      MuiList: {
        root: {
          width: '100%'
        },
        padding: {
          paddingTop: 0,
          paddingBottom: theme.typography.pxToRem(theme.spacing(2))
        }
      },
      MuiListItem: {
        root: {},
        button: {
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: addCssColorAlpha(
              theme.palette.primary.main,
              theme.palette.action.hoverOpacity
            )
          }
        }
      },
      MuiListItemText: {
        root: {
          display: 'list-item',
          listStyle: 'disc',
          marginTop: 0,
          marginBottom: 0,
          marginLeft: theme.spacing(2),
          color: theme.palette.grey[500]
        },
        primary: {
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: 1
        }
      },
      MuiTypography: {
        gutterBottom: {
          marginBottom: theme.typography.pxToRem(theme.spacing(1.5))
        }
      }
    }
  });
