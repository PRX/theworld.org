/**
 * @file EmbedCode.style.ts
 * Styles for EmbedCode.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useNoJsPlayerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'none',
      '.no-js &': {
        display: 'block',
        width: '100%',
        height: theme.typography.pxToRem(35),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      }
    }
  })
);
