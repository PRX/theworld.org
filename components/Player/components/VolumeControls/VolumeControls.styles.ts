/**
 * @file VolumeControls.style.ts
 * Styles and theme for VolumeControls.
 */

import { makeStyles } from 'tss-react/mui';

export const useVolumeControlsStyles = makeStyles()(
  (theme) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr min-content',
      gap: theme.typography.pxToRem(8),
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
  }));
