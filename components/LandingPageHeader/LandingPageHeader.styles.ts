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
    typography: {
      h1: {
        fontSize: theme.typography.pxToRem(48)
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
      gridTemplateRows: 'max-content max-content',
      alignItems: 'end',
      maxHeight: '75vh',
      overflow: 'hidden',
      backgroundColor: theme.palette.primary.light,
      marginBottom: theme.typography.pxToRem(theme.spacing(2))
    },
    imageWrapper: {
      gridColumn: '1 / -1',
      gridRow: '1 / -1',
      height: '100%',
      zIndex: 0
    },
    image: {
      height: '100%',
      maxHeight: '75vh'
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
      minHeight: '33.33333%',
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
      },
      [theme.breakpoints.up('md')]: {
        '$withImage &': {
          position: 'absolute',
          bottom: 0,
          gridRow: 'unset'
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
      flexShrink: 0,
      margin: theme.typography.pxToRem(theme.spacing(3)),
      [theme.breakpoints.up('sm')]: {
        marginLeft: 0
      },
      [theme.breakpoints.up('md')]: {
        margin: 0,
        marginRight: theme.typography.pxToRem(theme.spacing(3))
      }
    },
    withImage: {}
  })
);
