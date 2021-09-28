/**
 * @file Story.body.typography.ts
 * Body typography styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';
import { headingProps } from '@theme/App.theme';

export const storyBodyTypography = (theme: Theme) =>
  ({
    position: 'relative',
    fontSize: '1.2rem',
    lineHeight: '1.7rem',

    '& :not([class*="Mui"]) a, & :not([class*="Mui"]) a:visited': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.primary.dark
      }
    },

    '& h2, & h3, & h4, & h5, & h6': {
      ...headingProps,
      marginTop: theme.typography.pxToRem(theme.spacing(8))
    },

    '& > p:first-of-type': {
      fontSize: '1.35rem',
      fontWeight: 300,
      lineHeight: '2.15rem',
      marginBottom: '1.5rem'
    },

    '& hr': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '2rem',
      border: 'none',
      '&::before': {
        content: '"* * *"',
        position: 'relative',
        top: '0.25rem',
        fontSize: '1.5rem',
        lineHeight: 0
      }
    },

    '& blockquote, & aside:not(.node-story-act)': {
      display: 'flow-root',
      backgroundColor: theme.palette.grey[200],
      margin: 0,
      padding: theme.typography.pxToRem(theme.spacing(3)),
      color: theme.palette.grey[700],
      fontSize: '0.9rem',
      lineHeight: '1.1rem',
      '& p': {
        margin: 0,
        '& + p': {
          marginTop: '1rem'
        }
      },
      '& footer': {
        marginTop: '0.75rem',
        '& cite': {
          '&::before': {
            content: '"-"',
            marginRight: '0.25rem'
          }
        }
      },
      '&.pullquote': {
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        marginTop: theme.typography.pxToRem(theme.spacing(4)),
        marginBottom: theme.typography.pxToRem(theme.spacing(4)),
        padding: `${theme.typography.pxToRem(theme.spacing(8))} 0`,
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: 'none',
        color: theme.palette.primary.dark,
        fontFamily: '"Alegreya", serif',
        fontSize: '1.75rem',
        textAlign: 'center',
        '& > *': {
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        },
        '& p': {
          lineHeight: theme.typography.pxToRem(32.4)
        },
        '& footer': {
          color: theme.palette.grey[700],
          fontSize: '1rem'
        }
      }
    },

    '& [gp-pullquote]': {
      padding: theme.typography.pxToRem(theme.spacing(3)),
      color: theme.palette.primary.dark,
      fontFamily: '"Alegreya", serif',
      fontSize: '1.5rem',
      textAlign: 'center'
    },
    '& [gp-pullquote-source]:not([gp-pullquote-source=""]):after': {
      content: '"- " attr(gp-pullquote-source)',
      display: 'block',
      marginTop: '0.75rem',
      color: theme.palette.grey[700],
      fontSize: '1rem'
    }
  } as CreateCSSProperties<{}>);
