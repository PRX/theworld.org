/**
 * @file NewsletterForm.style.ts
 * Styles for NewsletterForm.
 */

import {
  createMuiTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles';

export const newsletterFormTheme = (theme: Theme) => {
  const tempTheme = createMuiTheme(theme, {
    palette: {
      primary: {
        ...theme.palette.success,
        contrastText: theme.palette.common.white
      }
    }
  });

  return createMuiTheme(tempTheme, {
    overrides: {
      MuiInputBase: {
        root: {
          color: theme.palette.grey[700]
        }
      },
      MuiInputLabel: {
        root: {
          color: theme.palette.grey[700]
        }
      },
      MuiButton: {
        containedPrimary: {
          [theme.breakpoints.down('xs')]: {
            width: '100%'
          },
          '&:hover': {
            backgroundColor: tempTheme.palette.primary.dark
          }
        },
        label: {
          whiteSpace: 'nowrap'
        }
      }
    }
  });
};

export const newsletterFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: 'initial',
      '& a': {
        color: theme.palette.success.dark,
        '&:hover': {
          color: theme.palette.success.main
        },
        '&:visited': {
          color: theme.palette.success.dark,
          '&:hover': {
            color: theme.palette.success.main
          }
        }
      }
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr min-content',
      alignItems: 'center',
      gridGap: ({ compact }: { compact: boolean }) =>
        `${theme.spacing(compact ? 1 : 2)}px`,
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr',
        justifyContent: 'stretch'
      }
    },
    optin: {
      gridColumn: '1 / -1',
      marginTop: ({ compact }: { compact: boolean }) =>
        `-${theme.spacing(compact ? 1 : 2)}px`,
      [theme.breakpoints.down('xs')]: {
        paddingTop: `${theme.spacing(1)}px`
      }
    }
  })
);
