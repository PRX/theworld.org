/**
 * @file LandingPageHeader.style.ts
 * Styles for LandingPageHeader.
 */

import {
  createTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const landingPageHeaderTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      h1: {
        fontSize: `clamp(${theme.typography.pxToRem(
          18
        )}, 10vw, ${theme.typography.pxToRem(48)})`
      },
      subtitle1: {
        fontSize: '1.5rem',
        lineHeight: '1.1'
      }
    }
  });

export const landingPageHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'grid',
      gridTemplateRows: '1fr max-content',
      alignItems: 'end',
      overflow: 'hidden',
      minHeight: '15vh',
      backgroundColor: theme.palette.primary.light,
      marginBottom: theme.typography.pxToRem(theme.spacing(2)),
      '&$withImage': {
        minHeight: '35vh'
      }
    },
    imageWrapper: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      zIndex: 0,
      [theme.breakpoints.up('md')]: {
        alignSelf: 'start',
        gridColumn: '1 / -1',
        gridRow: '1 / -1',
        height: '100%'
      }
    },
    image: {
      height: '100%'
    },
    content: {
      position: 'relative',
      gridColumn: '1 / -1',
      gridRow: '1 / -1',
      display: 'grid',
      alignItems: 'end',
      // gridTemplateColumns: '1fr 100vw 1fr',
      gridGap: theme.typography.pxToRem(theme.spacing(2)),
      width: '100%',
      padding: theme.typography.pxToRem(theme.spacing(3)),
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        bottom: -1,
        left: -1,
        right: -1,
        zIndex: 0,
        backgroundColor: addCssColorAlpha(
          theme.palette.background.default,
          0.65
        ),
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
    header: {
      gridRow: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.typography.pxToRem(theme.spacing(2)),
      alignItems: 'center',
      zIndex: 1,
      '& > :first-child': {
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
      gridGap: theme.typography.pxToRem(theme.spacing(2))
    },
    logo: {
      position: 'relative',
      flexShrink: 0,
      ...((min, size, max) => ({
        width: `clamp(${min}, ${size}, ${max})`,
        height: `clamp(${min}, ${size}, ${max})`
      }))(theme.typography.pxToRem(80), '60vw', theme.typography.pxToRem(200)),
      margin: `${theme.typography.pxToRem(theme.spacing(3))} 0`,
      [theme.breakpoints.up('md')]: {
        margin: 0,
        marginRight: theme.typography.pxToRem(theme.spacing(3))
      }
    },
    withImage: {}
  })
);
