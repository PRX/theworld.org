/**
 * @file Story.body.typography.ts
 * Body typography styles as JSS object.
 */

import { type Theme } from '@mui/material/styles';
import { headingProps } from '@theme/App.theme';
import { alegreya } from '@theme/fonts';

export const storyBodyTypography = (theme: Theme) => ({
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
    ...headingProps
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
    padding: theme.typography.pxToRem(24),
    color: theme.palette.grey[700],
    fontSize: '1.2rem',
    lineHeight: '1.2rem',
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
      color: theme.palette.primary.dark,
      fontFamily: alegreya.style.fontFamily,
      fontSize: '1.5rem',
      textAlign: 'center',
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
});
