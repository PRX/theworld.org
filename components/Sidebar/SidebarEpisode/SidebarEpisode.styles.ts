/**
 * @file SidebarEpisode.style.tsx
 * Styles for default sidebar episode card.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const sidebarEpisodeStyles = makeStyles()(theme => ({
  root: {
    '& :is(.MuiButtonBase-root)': {
      fontSize: 'inherit',
      lineHeight: 'inherit'
    },
    '& :is(.MuiCard-root)': {
      color: theme.palette.primary.main
    },
    '& :is(.MuiCardActionArea-root)': {
      color: theme.palette.primary.main
    },
    '& :is(.MuiCardActions-root)': {
      margin: 0,
      padding: 0
    }
  },

  imageWrapper: {
    paddingTop: 'unset'
  },

  link: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    textIndent: '-2000vw'
  },

  header: {},

  title: {
    marginBlock: 0,
    fontSize: theme.typography.pxToRem(18)
  },

  audio: {
    position: 'relative',
    zIndex: 1
  }
}));

export const sidebarEpisodeTheme = (theme: Theme) =>
  createTheme(theme, {
    typography: {
      body1: {
        fontSize: theme.typography.pxToRem(16)
      },
      h2: {
        color: theme.palette.text.primary
      },
      h5: {
        fontSize: theme.typography.pxToRem(18)
      }
    },
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            fontSize: 'inherit',
            lineHeight: 'inherit'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            color: theme.palette.primary.main
          }
        }
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            margin: 0,
            padding: 0
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightBold,
            paddingBlock: `${8}px`
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          gutterBottom: {
            marginBottom: theme.typography.pxToRem(12)
          }
        }
      }
    }
  });
