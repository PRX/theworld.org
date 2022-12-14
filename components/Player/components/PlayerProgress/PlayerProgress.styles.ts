/**
 * @file PlayerProgress.style.ts
 * Styles and theme for PlayerProgress.
 */

import {
  createStyles,
  makeStyles,
  fade,
  Theme
} from '@material-ui/core/styles';

const trackSize = 5;

export const usePlayerProgressStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      position: 'relative',
      height: theme.typography.pxToRem(trackSize),
      backgroundColor: fade(theme.palette.background.paper, 0.3),
      cursor: 'pointer',
      '&::before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'calc(var(--loaded, 0) * 100%)',
        height: '100%',
        backgroundColor: fade(theme.palette.secondary.light, 0.3)
      },
      '&::after': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'calc(var(--progress, 0) * 100%)',
        height: '100%',
        backgroundColor: theme.palette.secondary.main
      }
    },
    handle: {
      transition: theme.transitions.create(['scale', 'box-shadow', 'opacity'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut
      }),
      position: 'absolute',
      top: '50%',
      left: 'calc(var(--progress, 0) * 100%)',
      width: theme.typography.pxToRem(trackSize),
      transform: 'translate(-50%, -50%)',
      aspectRatio: '1',
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '50%',
      boxShadow: theme.shadows[0],
      opacity: 0,
      '&::before': {
        transition: theme.transitions.create(['opacity'], {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut
        }),
        content: 'attr(data-text)',
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transformOrigin: '50% 100%',
        transform: 'translate(-50% -2px)',
        scale: 0.3333,
        opacity: 0,
        paddingInline: theme.typography.pxToRem(theme.spacing(0.5)),
        backgroundColor: theme.palette.secondary.main,
        border: `3px solid ${theme.palette.secondary.light}`,
        borderRadius: '3rem',
        boxShadow: theme.shadows[2],
        color: theme.palette.secondary.contrastText,
        pointerEvents: 'none'
      },
      '$root:hover &, $root[data-scrubbing] &': {
        scale: 3,
        boxShadow: theme.shadows[2],
        opacity: 0.9999,
        '&::before': {
          opacity: 0.9999
        }
      }
    }
  })
);
