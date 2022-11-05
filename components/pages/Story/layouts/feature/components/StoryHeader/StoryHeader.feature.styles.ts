/**
 * @file LandingPageHeader.style.ts
 * Styles for LandingPageHeader.
 */

import {
  createMuiTheme,
  Theme,
  makeStyles,
  createStyles,
  fade
} from '@material-ui/core/styles';
import { addCssColorAlpha } from '@lib/parse/color';

export const storyHeaderTheme = (theme: Theme) =>
  createMuiTheme(theme, {
    typography: {
      h1: {
        color: theme.palette.primary.contrastText,
        fontSize: theme.typography.pxToRem(28),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(48)
        }
      },
      subtitle1: {
        fontSize: theme.typography.pxToRem(20),
        lineHeight: theme.typography.pxToRem(24),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(24),
          lineHeight: theme.typography.pxToRem(30)
        }
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
      gridTemplateRows: '1fr max-content',
      alignContent: 'end',
      overflow: 'hidden',
      minHeight: '75vh',
      backgroundColor: theme.palette.primary.light,
      marginBottom: theme.typography.pxToRem(theme.spacing(2)),
      color: theme.palette.primary.contrastText,
      fontSize: '1.2rem'
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
      alignContent: 'end',
      // gridTemplateColumns: '1fr 100vw 1fr',
      gridGap: theme.typography.pxToRem(theme.spacing(2)),
      width: '100%',
      padding: theme.typography.pxToRem(theme.spacing(3)),
      textShadow: `1px 1px 6px ${addCssColorAlpha(
        theme.palette.common.black,
        0.3
      )}, 1px 1px 3px ${addCssColorAlpha(theme.palette.common.black, 0.4)}`
    },
    header: {
      gridRow: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1
    },
    teaser: {
      marginTop: theme.typography.pxToRem(theme.spacing(2)),
      fontSize: theme.typography.pxToRem(24),
      lineHeight: theme.typography.pxToRem(30)
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
    bylinePeople: {},
    bylinePerson: {
      '&::after': {
        content: "', '"
      },
      '&:last-of-type:not(:only-child)::before': {
        content: "' and '"
      },
      '&:last-of-type::after': {
        content: "''"
      }
    },
    date: {
      fontStyle: 'italic'
    },
    info: {
      display: 'grid',
      alignContent: 'start',
      gridGap: theme.typography.pxToRem(4)
    },
    audio: {
      position: 'relative',
      isolation: 'isolate',
      filter: 'url(#shadowed-goo)'
    },
    audioPlayButton: {
      padding: '0.1em',
      fontSize: theme.typography.pxToRem(80),
      border: `8px solid ${fade(theme.palette.common.white, 0.5)}`
    },
    audioAddButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      translate: '30% 0',
      fontSize: theme.typography.pxToRem(20),
      border: `4px solid ${fade(theme.palette.common.white, 0.5)}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.light
      },
      '&[data-queued]': {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.success.light
        }
      }
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
      },
      '& a': {
        color: theme.palette.primary.main,
        '&:visited': {
          color: theme.palette.primary.main
        },
        '&:hover': {
          color: theme.palette.primary.dark
        }
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
