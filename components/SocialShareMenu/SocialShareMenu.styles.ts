/**
 * @file SocialShareMenu.style.ts
 * Styles for SocialShareMenu.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const socialShareMenuStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        position: 'fixed',
        bottom: theme.typography.pxToRem(theme.spacing(2)),
        right: theme.typography.pxToRem(theme.spacing(2)),
        zIndex: theme.zIndex.speedDial
      }
    }),
  { name: 'TwSocialShareMenu' }
);
