/**
 * @file PlayAudioButton.style.ts
 * Styles and theme for PlayAudioButton.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const playAudioButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    circularProgressPrimary: {
      color: 'inherit'
    },
    iconButtonRoot: ({ playing }: any) => ({
      borderRadius: '50%',
      padding: '0.35em',
      ...(!playing && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.light
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
    iconButtonLabel: {
      display: 'grid',
      '& > *': {
        gridRow: '1 / -1',
        gridColumn: '1 / -1',
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.sharp
        })
      }
    },
    iconRoot: {
      fontSize: 'inherit',
      fill: 'currentColor',
      margin: 0
    },
    hideOnHover: {
      opacity: 0.99999,
      ':hover > &': {
        opacity: 0
      }
    },
    showOnHover: {
      opacity: 0,
      ':hover > &': {
        opacity: 0.99999
      }
    }
  })
);
