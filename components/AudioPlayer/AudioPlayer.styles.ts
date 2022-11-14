/**
 * @file AudioPlayer.style.ts
 * Styles and theme for AudioPlayer.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  lighten
} from '@material-ui/core/styles';
import { blue } from '@theme/colors';

const playerHeight = 50;

export const audioPlayerTheme = (theme: Theme) => {
  return createMuiTheme(theme, {
    overrides: {
      MuiIconButton: {
        root: {
          padding: theme.spacing(1),
          color: theme.palette.getContrastText(blue[900]),
          fontSize: theme.typography.pxToRem(playerHeight - theme.spacing(2)),

          '&:hover': {
            backgroundColor: lighten(
              blue[900],
              theme.palette.action.hoverOpacity * 2
            )
          }
        }
      },
      MuiSvgIcon: {
        root: {
          fontSize: 'inherit'
        }
      },
      MuiSlider: {
        root: {},
        rail: {
          height: '100%',
          top: 0,
          backgroundColor: lighten(blue[900], 0.3),
          opacity: 1
        },
        track: {
          height: '100%',
          top: 0,
          backgroundColor: theme.palette.primary.main
        },
        thumb: {
          transform: 'translateX(-50%)',
          willChange: 'width',
          transition: theme.transitions.create('width', {
            duration: '150ms',
            easing: theme.transitions.easing.easeOut
          }),
          width: 2,
          height: '100%',
          top: 0,
          marginTop: 0,
          marginLeft: 0,
          boxShadow: 'none',
          backgroundColor: theme.palette.primary.contrastText,
          borderRadius: 0,
          userSelect: 'none',

          '&:hover': {
            width: 6,
            boxShadow: 'none'
          },

          '&[class*="active"]': {
            boxShadow: 'none'
          }
        },
        active: {
          width: 10,
          '&:hover': {
            width: 10
          }
        },
        valueLabel: {
          left: 'auto',
          color: theme.palette.secondary.main,
          '& [class*="label"]': {
            color: theme.palette.secondary.contrastText
          }
        }
      }
    }
  });
};

export const audioPlayerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ playing, hasPlayed, stuck }) => ({
      ...((playing || hasPlayed) && {
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar
      }),
      transition: theme.transitions.create(['box-shadow'], {
        duration: theme.transitions.duration.standard
      }),
      display: 'grid',
      gridTemplateColumns: `${playerHeight}px 1fr 0fr`,
      gridColumnGap: theme.spacing(2),
      alignItems: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      backgroundColor: blue[900],
      boxShadow: theme.shadows[!stuck ? 1 : 3],
      color: theme.palette.getContrastText(blue[900])
    }),
    player: {
      display: 'none'
    },
    fallbackPlayer: {
      width: '100%',
      height: theme.typography.pxToRem(35),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    playBtn: ({ playing }: any) => ({
      ...(!playing && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark
        }
      }),
      ...(playing && {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark
        }
      })
    }),
    controls: {
      display: 'grid',
      gridTemplateColumns: '2fr minmax(200px, 10vw)',
      alignItems: 'center',
      gridColumnGap: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },
    progress: {
      position: 'relative',
      lineHeight: 0,
      backgroundColor: lighten(blue[900], 0.2)
    },
    loaded: {
      position: 'absolute',
      top: 0,
      height: '100%',
      backgroundColor: lighten(blue[900], 0.3)
    },
    seek: {},
    progressControls: {
      display: 'grid',
      gridTemplateColumns: 'auto',
      alignItems: 'center',
      gridColumnGap: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'max-content 1fr max-content'
      }
    },
    progressRail: {
      display: 'none'
    },
    volumeControls: {
      display: 'grid',
      gridTemplateColumns: `${playerHeight}px 1fr`,
      gridColumnGap: theme.spacing(0.5),
      alignItems: 'center'
    },
    duration: {
      display: 'none',
      fontSize: '1.25rem',
      [theme.breakpoints.up('sm')]: {
        display: 'initial'
      }
    },
    played: {},
    total: {},
    message: {
      overflow: 'hidden',
      fontSize: '1.25rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    menu: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    [theme.breakpoints.down('sm')]: {
      embedBtn: {
        display: 'none'
      },
      popoutBtn: {
        display: 'none'
      }
    }
  })
);
