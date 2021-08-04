/**
 * @file AppSearch.style.ts
 * Styles and theme for AppSearch.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const appSearchTheme = (theme: Theme) => {
  return createMuiTheme(theme, {
    overrides: {
      MuiAppBar: {
        root: {
          color: theme.palette.primary.contrastText
        }
      },
      MuiInput: {
        root: {
          fontSize: 'clamp(2rem, 10vw, 5rem)',
          fontFamily:
            '"Montserrat","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
          fontWeight: theme.typography.fontWeightBold
        }
      },
      MuiInputLabel: {
        root: {
          fontSize: 'clamp(5rem, 10vw, 5rem)',
          fontFamily:
            '"Montserrat","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
          whiteSpace: 'nowrap'
        },
        shrink: {
          transform: 'translate(0, 0) scale(0.25)'
        }
      }
    }
  });
};

export const appSearchStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      flexGrow: 1,
      color: 'currentColor',
      fontSize: '2rem'
    },
    searchForm: {
      display: 'flex',
      justifyContent: 'center',
      padding: `${theme.typography.pxToRem(
        theme.spacing(4)
      )} ${theme.typography.pxToRem(theme.spacing(5))}`,
      fontSize: '5rem'
    },
    query: {
      maxWidth: '800px'
    }
  })
);
