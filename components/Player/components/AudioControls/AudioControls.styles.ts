/**
 * @file AudioControls.style.ts
 * Styles and theme for AudioControls.
 */

import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const useAudioControlsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      isolation: 'isolate',
      display: 'grid',
      gridAutoFlow: 'column',
      alignItems: 'center',
      fontSize: '1.5em',
      filter: 'url(#shadowed-goo)',
      '& > *': {},
      '& > :first-child': {
        padding: '0.25em',
        fontSize: '1.5em'
      },
      // '& > :last-child': {
      //   borderRadius: '0 50% 50% 0'
      // }
      '&[data-variant="minimal"]': {
        filter: 'none',
        backgroundColor: theme.palette.common.white,
        // border: `2px solid ${theme.palette.primary.main}`,
        padding: '2px',
        borderRadius: '2em',
        overflow: 'hidden',
        '& > *': {
          padding: '0.25em',
          // borderRadius: 0,
          fontSize: '1em',
          backgroundColor: 'transparent',
          color: theme.palette.text.secondary,
          '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.3),
            color: theme.palette.text.primary
          }
        },
        '& > :first-child': {
          // borderRadius: '50% 0 0 50%'
        },
        '& > :last-child': {
          // borderRadius: '0 50% 50% 0'
        }
      },
      '&[data-variant="feature"]': {
        alignItems: 'end'
      }
    },
    playAudioButton: {
      '[data-variant="minimal"] &': {
        '&[data-playing]': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.light
          }
        }
      },
      '[data-variant="feature"] &': {
        padding: '0.1em',
        fontSize: theme.typography.pxToRem(80),
        border: `8px solid ${fade(theme.palette.common.white, 0.5)}`
      }
    },
    addAudioButton: {
      '[data-variant="default"]': {},
      '[data-variant="minimal"] &': {
        '&[data-queued]': {
          color: theme.palette.success.main,
          '&:hover': {
            backgroundColor: fade(theme.palette.success.main, 0.5)
          }
        }
      },
      '[data-variant="feature"] &': {
        position: 'relative',
        marginLeft: `-${theme.typography.pxToRem(30)}`,
        fontSize: theme.typography.pxToRem(20),
        border: `4px solid ${fade(theme.palette.common.white, 0.5)}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.light
        },
        '&[data-queued]': {
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.success.light
          }
        }
      }
    }
  })
);
