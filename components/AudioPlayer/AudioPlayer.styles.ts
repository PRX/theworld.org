/**
 * @file AudioPlayer.style.ts
 * Styles and theme for AudioPlayer.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { blue } from '@theme/colors';
import { addCssColorAlpha } from '@lib/parse/color';

const playerHeight = 50;

export const audioPlayerTheme = (theme: Theme) => {
  const textColor = theme.palette.getContrastText(blue[900]);

  return createMuiTheme(theme, {
    overrides: {
      MuiIconButton: {
        root: {
          padding: theme.spacing(1),
          color: textColor,
          fontSize: theme.typography.pxToRem(playerHeight - theme.spacing(2)),

          '&:hover': {
            backgroundColor: addCssColorAlpha(
              textColor,
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
          backgroundColor: textColor
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
      gridTemplateColumns: `${playerHeight}px 1fr max-content`,
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
    playBtn: ({ playing }) => ({
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
      gridTemplateColumns: '2fr 1fr',
      alignItems: 'center',
      gridColumnGap: theme.spacing(2)
    },
    progressControls: {
      display: 'grid',
      gridTemplateColumns: 'max-content 1fr max-content',
      alignItems: 'center',
      gridColumnGap: theme.spacing(1)
    },
    progressRail: ({ loaded }: any) => ({
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        width: `${(loaded || 0) * 100}%`,
        height: '100%',
        backgroundColor: theme.palette.primary.light
      }
    }),
    volumeControls: {
      display: 'grid',
      gridTemplateColumns: `${playerHeight}px 1fr`,
      gridColumnGap: theme.spacing(0.5),
      alignItems: 'center'
    },
    duration: {
      fontSize: '1.25rem'
    },
    message: {
      overflow: 'hidden',
      fontSize: '1.25rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    seek: {},
    menu: {}
  })
);
