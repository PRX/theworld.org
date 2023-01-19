/**
 * @file EmbedCode.style.ts
 * Styles for EmbedCode.
 */

import { createTheme, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const embedCodeTheme = (theme: Theme) =>
  createTheme(theme, {
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: theme.spacing(0.5),
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontSize: theme.typography.pxToRem(16),

            '&:hover': {
              backgroundColor: theme.palette.primary.dark
            }
          }
        }
      }
    }
  });

export const embedCodeStyles = makeStyles()((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr min-content',
    alignItems: 'center'
  },

  code: {
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '0 0.5rem',
    lineHeight: '1.5rem',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'currentColor',
      opacity: theme.palette.action.hoverOpacity * 2
    }
  },

  MuiIconButtonRoot: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.pxToRem(16),

    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));
