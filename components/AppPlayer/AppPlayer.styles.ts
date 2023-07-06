/**
 * @file AppPlayer.style.ts
 * Styles and theme for AppPlayer.
 */

import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const appPlayerStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    isolation: 'isolate',
    backdropFilter: 'blur(30px)',
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    color: theme.palette.grey[900]
  },

  progress: {},

  toolbarRoot: {
    display: 'grid',
    gridTemplateColumns: '0fr 1fr 0fr',
    justifyContent: 'space-between',
    gap: theme.typography.pxToRem(16)
  },

  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.typography.pxToRem(2),
    '&:last-child': {
      justifySelf: 'end'
    }
  },

  iconButtonRoot: {
    borderRadius: '50%',
    fontSize: theme.typography.pxToRem(28),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[900], 0.1)
    }
  },

  playButton: {
    borderRadius: '50%',
    fontSize: theme.typography.pxToRem(36),
    marginBlock: theme.typography.pxToRem(8)
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
  },

  volume: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },

  MuiMenuItemRoot: {
    textAlign: 'start'
  }
}));
