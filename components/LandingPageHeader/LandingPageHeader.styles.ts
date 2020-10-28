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
import { relative } from 'path';

export const landingPageHeaderTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    overrides: {}
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
      backgroundColor: theme.palette.primary.dark,
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
        height: '110%'
      },
      '&::after': {
        height: '150%'
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
      alignItems: 'center',
      zIndex: 1,
      [theme.breakpoints.up('sm')]: {
        alignItems: 'flex-start'
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    },
    title: {
      color: theme.palette.primary.dark,
      fontSize: '3rem',
      lineHeight: '1.1',
      margin: `0 0 ${theme.typography.pxToRem(theme.spacing(3))}`
    },
    subhead: {
      fontSize: '1.5rem'
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
