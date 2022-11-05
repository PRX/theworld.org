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
      isolation: 'isolate',
      backdropFilter: 'blur(30px)',
      backgroundColor: fade(theme.palette.background.paper, 0.8),
      color: theme.palette.grey[900]
    },
    progress: {},
    toolbarRoot: {
      paddingBlock: `${theme.spacing(1)}px`,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      justifyContent: 'space-between',
      gap: theme.typography.pxToRem(theme.spacing(2))
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.typography.pxToRem(theme.spacing(0.25))
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
      fontSize: theme.typography.pxToRem(36)
    },
    info: {
      justifyContent: 'center'
    }
  })
);
