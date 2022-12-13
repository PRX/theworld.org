/**
 * @file SliderValueLabel.style.ts
 * Styles for SliderValueLabel.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const sliderValueLabelTheme = (theme: Theme) =>
  createTheme(theme, {
    overrides: {}
  });

export const sliderValueLabelStyles = makeStyles((theme: Theme) =>
  createStyles({
    thumb: {
      '&$open': {
        '& $offset': {
          transform: 'scale(1) translateY(4px)'
        }
      }
    },
    circle: ({ value }: any) => {
      const minSize = 32;
      const size =
        (value &&
          Math.max(
            minSize,
            8 *
              (value.replace(':', '').length +
                (value.split(':').length - 1) * 0.35)
          )) ||
        minSize;

      return {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        transition: theme.transitions.create(['top', 'width', 'height'], {
          duration: theme.transitions.duration.shortest
        }),
        width: size,
        height: size,
        borderRadius: '0 50% 50% 50%',
        backgroundColor: 'currentColor',
        transform: 'rotate(45deg)',
        transformOrigin: '0 0',
        padding: theme.spacing(0.75),
        boxShadow: theme.shadows[3]
      };
    },
    label: {
      color: theme.palette.primary.contrastText,
      transform: 'rotate(-45deg)'
    },
    offset: {
      zIndex: 1,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1.2,
      transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.shortest
      }),
      top: '100%',
      transformOrigin: 'top center',
      transform: 'scale(0)',
      position: 'absolute'
    },
    open: {}
  })
);
