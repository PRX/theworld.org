/**
 * @file StoryCard.style.tsx
 * Styles for story card.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const storyCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        display: 'grid',
        marginTop: 0
      }
    },
    title: {
      marginTop: 0,
      fontSize: theme.typography.pxToRem(20),
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(18)
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
      gridTemplateColumns: '1fr 3fr',
      gridGap: `${theme.spacing(2)}px`,
      alignItems: 'center',
      padding: `${theme.spacing(2)}px`,
      '$feature &': {
        gridTemplateColumns: '1fr 1fr'
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr 2fr',
        '$feature &': {
          gridTemplateColumns: '1fr'
        }
      }
    },
    MuiCardContentRoot: {
      overflow: 'hidden',
      padding: 0
    },
    MuiCardMediaRoot: {
      paddingTop: `${100 / (1 / 1)}%`,
      '$feature &': {
        paddingTop: `${100 / (16 / 9)}%`
      },
      [theme.breakpoints.down('sm')]: {
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
  createMuiTheme(theme, {
    typography: {
      h5: {
        lineHeight: 1.1
      },
      overline: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
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
          color: theme.palette.primary.main,
          marginTop: 0,
          borderTop: `1px solid ${theme.palette.grey[200]}`
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
          width: '100%'
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
          marginBottom: theme.typography.pxToRem(theme.spacing(0.5))
        }
      }
    }
  });
