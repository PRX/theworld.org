/**
 * @file Story.body.typography.ts
 * Body typography styles as JSS object.
 */

import { type Theme } from '@mui/material/styles';
import { headingProps } from '@theme/App.theme';
import { alegreya } from '@theme/fonts';

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
      marginTop: theme.typography.pxToRem(64)
    },

    '& .has-text-align-center': {
      textAlign: 'center'
    },
    '& .has-text-align-right': {
      textAlign: 'right'
    },

    '& hr': {
      height: '2px',
      backgroundColor: theme.palette.divider,
      border: 'none'
    },
    '& hr.is-style-wide': {
      height: '4px'
    },
    '& hr:where(.alignwide, .alignfull)': {
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%',
      width: '100vw'
    },
    '& hr.alignwide': {
      maxWidth: '1200px'
    },
    '& hr.aligncenter': {
      marginInline: theme.spacing(4)
    },
    '& hr.is-style-dots': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '2rem',
      background: 'none',
      color: theme.palette.divider,
      '&::before': {
        content: '"•••"',
        fontSize: '1.5rem',
        lineHeight: 0,
        letterSpacing: '3rem'
      }
    },

    '& > blockquote, & > aside:not(.node-story-act), & > .wp-block-pullquote': {
      display: 'flow-root',
      backgroundColor: theme.palette.grey[200],
      padding: theme.typography.pxToRem(24),
      color: theme.palette.grey[700],
      fontSize: '0.9rem',
      lineHeight: '1.1rem',
      '& p': {
        margin: 0,
        '& + p': {
          marginTop: '1rem'
        }
      },
      '& :where(footer)': {
        marginTop: '0.75rem'
      },
      '& cite': {
        '&::before': {
          content: '"-"',
          marginRight: '0.25rem'
        }
      },
      '&:where(.pullquote, .wp-block-pullquote)': {
        marginBlock: theme.typography.pxToRem(32),
        paddingBlock: `${theme.typography.pxToRem(64)}`,
        paddingInline: `${theme.typography.pxToRem(16)}`,
        borderBlock: `1px solid ${theme.palette.divider}`,
        background: 'none',
        color: theme.palette.primary.dark,
        fontFamily: alegreya.style.fontFamily,
        fontSize: '1.75rem',
        textAlign: 'center',
        textWrap: 'balance',
        '&:where(.alignwide, .alignfull)': {
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          '& > *': {
            maxWidth: '1200px',
            marginInline: 'auto'
          }
        },
        '&.alignwide': {
          maxWidth: '1200px'
        },
        '&:not(.alignleft, .alignright)': {
          marginInline: 0
        },
        '&:where(.alignleft, .alignright)': {
          marginBlockStart: 0,
          paddingBlock: `${theme.typography.pxToRem(24)}`
        },
        '& blockquote': {
          display: 'grid',
          gap: theme.typography.pxToRem(16)
        },
        '& p': {
          lineHeight: theme.typography.pxToRem(32.4)
        },
        '& :where(footer, cite)': {
          color: theme.palette.grey[700],
          fontSize: '1rem'
        }
      }
    },

    '& [gp-pullquote]': {
      padding: theme.typography.pxToRem(24),
      color: theme.palette.primary.dark,
      fontFamily: alegreya.style.fontFamily,
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
  } as any);
