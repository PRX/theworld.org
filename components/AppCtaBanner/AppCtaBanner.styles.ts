/**
 * @file appCtaBanner.style.ts
 * Styles for appCtaBanner.
 */

import { Theme, alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const appCtaBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
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
      color: 'inherit'
    },

    '.MuiFormControlLabel-root': {
      paddingLeft: theme.spacing(2)
    },

    '.MuiFormControlLabel-label': {
      paddingBottom: theme.spacing(0),
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
  }
}));
