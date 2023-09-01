/**
 * @file AppCtaLoadUnder.style.ts
 * Styles for AppCtaLoadUnder.
 */

import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const appCtaLoadUnderStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    zIndex: theme.zIndex.drawer,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),

    '.MuiTypography-h2': {
      color: theme.palette.primary.contrastText,
      fontSize: '1.2rem'
    },

    '.MuiTypography-body1': {
      fontSize: '1rem',
      lineHeight: 1.3,

      p: {
        marginBlock: 0,
        '& + &': {
          marginBlockStart: theme.spacing(1)
        }
      },

      a: {
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    },

    '.MuiButton-containedPrimary': {
      '&:hover': {
        backgroundColor: theme.palette.secondary.main
      }
    },

    '.MuiCheckbox-root': {
      color: theme.palette.primary.contrastText
    },

    '.MuiFormControlLabel-root': {
      paddingLeft: theme.spacing(2)
    },

    '.MuiFormControlLabel-label': {
      textAlign: 'left',

      p: {
        marginBlock: 0
      }
    },

    '.MuiButtonBase-root.Mui-disabled': {
      color: alpha(theme.palette.primary.main, 0.6)
    },

    '.MuiIconButton-root': {
      '&:hover': {
        backgroundColor: theme.palette.action.focus
      }
    },

    '.MuiToolbar-root': {
      justifyContent: 'center',
      marginTop: 0,
      marginBottom: 0,
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  },

  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));
