/**
 * @file AppPlayer.style.ts
 * Styles and theme for AppPlayer.
 */

import {
  createStyles,
  makeStyles,
  Theme,
  fade
} from '@material-ui/core/styles';

export const appPlayerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      isolation: 'isolate',
      backdropFilter: 'blur(30px)',
      backgroundColor: fade(theme.palette.background.paper, 0.8),
      color: theme.palette.grey[900]
    },
    progress: {},
    toolbarRoot: {
      display: 'grid',
      gridTemplateColumns: '0fr 1fr 0fr',
      justifyContent: 'space-between',
      gap: theme.typography.pxToRem(theme.spacing(2))
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.typography.pxToRem(theme.spacing(0.25)),
      '&:last-child': {
        justifySelf: 'end'
      }
    },
    iconButtonRoot: {
      borderRadius: '50%',
      fontSize: theme.typography.pxToRem(28),
      '&:hover': {
        backgroundColor: fade(theme.palette.grey[900], 0.1)
      }
    },
    playButton: {
      borderRadius: '50%',
      fontSize: theme.typography.pxToRem(36),
      marginBlock: theme.typography.pxToRem(theme.spacing(1))
    },
    timeInfo: {
      [theme.breakpoints.down(336)]: {
        display: 'none'
      }
    },
    info: {
      display: 'flex',
      gap: 'inherit',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    trackInfo: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    queueControls: {},
    autoplayButton: {
      [theme.breakpoints.down(400)]: {
        display: 'none'
      }
    }
  })
);
