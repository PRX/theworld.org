/**
 * @file LandingPageHeader.style.ts
 * Styles for LandingPageHeader.
 */

import { alpha, createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const landingPageHeaderTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h1: {
        fontSize: `clamp(${theme.typography.pxToRem(
          18
        )}, 10vw, ${theme.typography.pxToRem(48)})`,
        textTransform: 'capitalize'
      },
      subtitle1: {
        fontSize: '1.5rem',
        lineHeight: '1.1'
      }
    }
  });

export const landingPageHeaderStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: '1fr max-content',
    alignItems: 'end',
    overflow: 'hidden',
    minHeight: '15vh',
    backgroundColor: theme.palette.primary.light,
    marginBottom: theme.typography.pxToRem(16),
    width: '100%',
    padding: theme.typography.pxToRem(24),
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      bottom: -1,
      left: -1,
      right: -1,
      zIndex: 0,
      backgroundColor: alpha(theme.palette.background.default, 0.65),
      clipPath: 'polygon(0 0, 100% 66.66666%, 100% 100%, 0 100%)'
    },
    '&::before': {
      height: '110%',
      [theme.breakpoints.down('sm')]: {
        height: '66%'
      }
    },
    '&::after': {
      height: '150%',
      [theme.breakpoints.down('sm')]: {
        height: '80%'
      }
    }
  },

  content: {},

  header: {
    position: 'relative',
    gridRow: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.typography.pxToRem(16),
    alignItems: 'center',
    zIndex: 1,
    '& > :first-of-type': {
      flexShrink: 0
    },
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },

  text: {
    display: 'grid',
    gridGap: theme.typography.pxToRem(16)
  },

  logo: {
    position: 'relative',
    flexShrink: 0,
    ...((min, size, max) => ({
      width: `clamp(${min}, ${size}, ${max})`,
      height: `clamp(${min}, ${size}, ${max})`
    }))(theme.typography.pxToRem(80), '60vw', theme.typography.pxToRem(200)),
    margin: `${theme.typography.pxToRem(24)} 0`,
    [theme.breakpoints.up('md')]: {
      margin: 0,
      marginRight: theme.typography.pxToRem(16)
    }
  },

  withImage: {}
}));
