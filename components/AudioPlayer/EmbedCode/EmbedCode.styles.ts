/**
 * @file EmbedCode.style.ts
 * Styles for EmbedCode.
 */

import {
  createTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

export const embedCodeTheme = (theme: Theme) => {
  return createTheme(theme, {
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
    }
  })
);
