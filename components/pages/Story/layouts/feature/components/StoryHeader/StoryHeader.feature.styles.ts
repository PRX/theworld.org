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

export const storyHeaderTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      h1: {
        color: theme.palette.primary.contrastText,
        fontSize: theme.typography.pxToRem(48),
        textShadow: `1px 1px 6px ${addCssColorAlpha(
          theme.palette.common.black,
          0.3
        )}, 1px 1px 3px ${addCssColorAlpha(theme.palette.common.black, 0.4)}`
      },
      subtitle1: {
        fontSize: theme.typography.pxToRem(24),
        lineHeight: theme.typography.pxToRem(30)
      }
    },
    overrides: {
      MuiLink: {
        root: {
          color: theme.palette.primary.contrastText,
          '&:visited': {
            color: theme.palette.primary.contrastText
          },
          '&:hover': {
            color: addCssColorAlpha(theme.palette.primary.contrastText, 0.6)
          }
        }
      }
    }
  });

export const storyHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'grid',
      gridTemplateRows: 'max-content max-content',
      alignItems: 'end',
      maxHeight: '75vh',
      overflow: 'hidden',
      backgroundColor: theme.palette.primary.light,
      marginBottom: theme.typography.pxToRem(theme.spacing(2)),
      color: theme.palette.primary.contrastText,
      fontSize: '1.2rem'
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
      zIndex: 1
    },
    teaser: {
      marginTop: theme.typography.pxToRem(theme.spacing(2))
    },
    byline: {
      padding: 0,
      margin: 0,
      listStyle: 'none'
    },
    bylineItem: {},
    bylineLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    date: {
      fontStyle: 'italic'
    },
    meta: {},
    info: {
      display: 'grid',
      alignContent: 'start',
      gridGap: theme.typography.pxToRem(4)
    },
    programLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    categoryLink: {
      fontWeight: theme.typography.fontWeightBold
    },
    footer: {
      display: 'grid',
      gridGap: '0.5rem',
      marginBottom: theme.typography.pxToRem(theme.spacing(2)),
      '& p': {
        margin: 0
      },
      '& p + p': {
        marginTop: '1rem'
      }
    },
    caption: {},
    credit: {
      display: 'flex',
      fontSize: '0.75rem',
      '&::before': {
        content: "'Credit:'",
        marginRight: '0.25rem'
      }
    },
    withImage: {}
  })
);
