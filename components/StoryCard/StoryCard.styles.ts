/**
 * @file StoryCard.style.tsx
 * Styles for story card.
 */

import {
  createMuiTheme,
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const useStoryCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        display: 'grid',
        marginTop: 0
      }
    },
    heading: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      gap: theme.typography.pxToRem(theme.spacing(3))
    },
    title: {
      marginTop: 0,
      fontSize: theme.typography.pxToRem(20),
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(18)
      },
      lineHeight: '1.3'
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
      inset: 0,
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
    audio: {
      position: 'relative',
      zIndex: 1
    },
    audioPlayBtn: {
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
      },
      '$feature &': {
        fontSize: '8rem'
      }
    },
    MuiCardActionAreaRoot: {
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
      gridGap: `${theme.spacing(2)}px`,
      alignItems: 'center',
      padding: `${theme.spacing(2)}px`,
      '$feature &': {
        gridTemplateColumns: '1fr'
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr 2fr'
      }
    },
    MuiCardContentRoot: {
      padding: 0
    },
    MuiCardMediaRoot: {
      alignSelf: 'start',
      aspectRatio: '1',
      '$feature &': {
        aspectRatio: 16 / 9
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
          display: 'grid',
          backgroundColor: theme.palette.primary.main,
          '& > *': {
            gridRow: '1 / -1',
            gridColumn: '1 / -1'
          }
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
