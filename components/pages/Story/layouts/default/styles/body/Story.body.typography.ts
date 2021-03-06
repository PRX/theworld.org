/**
 * @file Story.body.typography.ts
 * Body typography styles as JSS object.
 */

import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/styles';
import { headingProps } from '@theme/App.theme';

export const storyBodyTypography = (theme: Theme) =>
  ({
    fontSize: '1.2rem',
    lineHeight: '1.7rem',

    '& a, & a:visited': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.secondary.main
      }
    },

    '& h2, & h3, & h4, & h5, & h6': {
      ...headingProps
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
        background: 'none',
        color: theme.palette.secondary.main,
        fontFamily: '"Alegreya", serif',
        fontSize: '1.5rem',
        textAlign: 'center',
        '& p': {
          lineHeight: theme.typography.pxToRem(32.4)
        },
        '& footer': {
          color: theme.palette.grey[600],
          fontSize: '0.9rem'
        }
      }
    },

    '& [gp-pullquote]': {
      padding: theme.typography.pxToRem(theme.spacing(3)),
      color: theme.palette.secondary.main,
      fontFamily: '"Alegreya", serif',
      fontSize: '1.5rem',
      textAlign: 'center'
    },
    '& [gp-pullquote-source]:not([gp-pullquote-source=""]):after': {
      content: '"- " attr(gp-pullquote-source)',
      display: 'block',
      marginTop: '0.75rem',
      color: theme.palette.grey[600],
      fontSize: '0.9rem'
    }
  } as CreateCSSProperties<{}>);
