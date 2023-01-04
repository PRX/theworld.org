/**
 * @file VolumeControls.style.ts
 * Styles and theme for VolumeControls.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useVolumeControlsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr min-content',
      gap: theme.typography.pxToRem(theme.spacing(1)),
      alignItems: 'center',
      width: '150px'
    },
    track: {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.sharp
      }),
      '@media (hover: hover)': {
        opacity: 0,
        ':hover > &': {
          opacity: 1
        }
      }
    },
    iconRoot: {
      fontSize: 'inherit'
    }
  })
);
