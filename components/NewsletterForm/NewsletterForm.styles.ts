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
        ...theme.palette.success
      }
    }
  });

  return createMuiTheme(tempTheme, {
    overrides: {
      MuiButton: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: tempTheme.palette.primary.dark
          }
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
        color: theme.palette.success.main,
        '&:hover': {
          color: theme.palette.success.light
        },
        '&:visited': {
          color: theme.palette.success.main,
          '&:hover': {
            color: theme.palette.success.light
          }
        }
      }
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr min-content',
      alignItems: 'center',
      gridGap: ({ compact }: { compact: boolean }) =>
        `${theme.spacing(compact ? 1 : 2)}px`
    },
    optin: {
      gridColumn: '1 / -1'
    }
  })
);
