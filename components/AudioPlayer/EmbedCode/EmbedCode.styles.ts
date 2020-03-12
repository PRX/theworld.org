/**
 * @file EmbedCode.style.ts
 * Styles for EmbedCode.
 */

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const embedCodeTheme = (theme: Theme) => {
  return createMuiTheme(theme, {
    overrides: {
      MuiIconButton: {
        root: {
          padding: theme.spacing(0.5),
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontSize: theme.typography.pxToRem(24 - theme.spacing(1)),

          '&:hover': {
            backgroundColor: theme.palette.primary.dark
          }
        }
      }
    }
  });
};

export const embedCodeStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr min-content',
      alignItems: 'center'
    },
    code: {
      flexGrow: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      padding: '0 0.5rem',
      backgroundColor: theme.palette.divider,
      lineHeight: '1.5rem'
    }
  })
);
