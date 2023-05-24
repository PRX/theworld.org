/**
 * @file EmbedCode.style.ts
 * Styles for EmbedCode.
 */

import { makeStyles } from 'tss-react/mui';

export const useNoJsPlayerStyles = makeStyles()(theme => ({
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
}));
