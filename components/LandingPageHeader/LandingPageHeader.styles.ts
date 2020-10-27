/**
 * @file LandingPageHeader.style.ts
 * Styles for LandingPageHeader.
 */

import {
  createMuiTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const landingPageHeaderTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {}
  });

export const landingPageHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      flexGrow: 1,
      maxWidth: 'unset',
      minHeight: '25vh',
      maxHeight: '75vh',
      overflow: 'hidden',
      backgroundColor: theme.palette.primary.dark,
      '& > *': {
        position: 'relative',
        zIndex: 2,
        margin: 0
      },
      '& $imageWrapper': {
        zIndex: 0
      },
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: addCssColorAlpha(
          theme.palette.background.default,
          0.65
        )
      },
      '&::before': {
        clipPath: 'polygon(0 33.33333%, 100% 66.66666%, 100% 100%, 0 100%)'
      },
      '&::after': {
        clipPath: 'polygon(0 13.33333%, 100% 60.66666%, 100% 100%, 0 100%)'
      }
    },
    imageWrapper: {
      gridColumn: '1 / -1',
      gridRow: '1 / -1',
      maxHeight: '75vh'
    },
    content: {
      position: 'relative',
      display: 'grid',
      alignItems: 'end',
      // gridTemplateColumns: '1fr 100vw 1fr',
      gridGap: theme.typography.pxToRem(theme.spacing(2)),
      width: '100%',
      height: '66.66666%',
      margin: '0 auto',
      padding: theme.typography.pxToRem(theme.spacing(2)),
      '&::before': {
        content: '""',
        display: 'block',
        float: 'right',
        width: '55%',
        height: '7.4vw',
        shapeOutside: 'polygon(0 0, 100% 0, 100% 100%)'
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: `${theme.breakpoints.values.sm}px`
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: `${theme.breakpoints.values.md}px`
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: `${theme.breakpoints.values.lg}px`
      }
    },
    title: {
      color: theme.palette.primary.dark,
      fontSize: '3rem',
      lineHeight: '1.1',
      marginTop: 0
    },
    summary: {
      fontSize: '1.5rem'
    },
    form: {},
    body: {
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
      marginTop: `${theme.spacing(4)}px`,
      paddingTop: `${theme.spacing(4)}px`,
      borderTop: `1px solid ${theme.palette.divider}`
    }
  })
);
