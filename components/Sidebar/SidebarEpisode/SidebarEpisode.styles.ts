/**
 * @file SidebarEpisode.style.tsx
 * Styles for default sidebar episode card.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const sidebarEpisodeStyles = makeStyles()(theme => ({
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

  header: {
    display: 'grid',
    gridTemplateColumns: '0fr 1fr 0fr',
    alignItems: 'center',
    gap: theme.typography.pxToRem(8)
  },

  title: {
    marginBlock: 0
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
    overrides: {
      MuiButtonBase: {
        root: {
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }
      },
      MuiCard: {
        root: {
          color: theme.palette.primary.main
        }
      },
      MuiCardActions: {
        root: {
          margin: 0,
          padding: 0
        }
      },
      MuiCardContent: {
        root: {
          color: theme.palette.text.primary,
          fontWeight: theme.typography.fontWeightBold,
          paddingBlock: `${8}px`
        }
      },
      MuiTypography: {
        gutterBottom: {
          marginBottom: theme.typography.pxToRem(12)
        }
      }
    }
  });
