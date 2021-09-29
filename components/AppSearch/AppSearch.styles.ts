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
      MuiCard: {
        root: {
          height: '100%'
        }
      },
      MuiCardActionArea: {
        root: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start'
        }
      },
      MuiDialogContent: {
        root: {
          backgroundColor: theme.palette.background.default
        }
      },
      MuiInput: {
        root: {
          fontSize: 'clamp(2rem, 10vw, 3rem)',
          fontFamily:
            '"Montserrat","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
          fontWeight: theme.typography.fontWeightBold
        }
      },
      MuiInputLabel: {
        root: {
          fontSize: 'clamp(3rem, 10vw, 3rem)',
          fontFamily:
            '"Montserrat","Source Sans Pro","Helvetica Neue",Helvetica,Arial,"Nimbus Sans L",sans-serif',
          whiteSpace: 'nowrap'
        },
        formControl: {
          [`${theme.breakpoints.down(760)}`]: {
            transform: 'translate(0, 0) scale(0.35)'
          }
        },
        shrink: {
          transform: 'translate(0, 0) scale(0.35)'
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
