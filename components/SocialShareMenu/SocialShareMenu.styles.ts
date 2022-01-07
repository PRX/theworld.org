/**
 * @file SocialShareMenu.style.ts
 * Styles for SocialShareMenu.
 */

import { addCssColorAlpha } from '@lib/parse/color';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const socialShareMenuStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        position: 'fixed',
        bottom: theme.typography.pxToRem(theme.spacing(2)),
        right: theme.typography.pxToRem(theme.spacing(2)),
        zIndex: theme.zIndex.speedDial
      },
      staticTooltipLabel: {
        backgroundColor: 'transparent',
        color: theme.palette.common.white,
        fontWeight: theme.typography.fontWeightBold,
        paddingRight: 0
      },
      backdropRoot: {
        backgroundImage: `linear-gradient(-45deg, ${addCssColorAlpha(
          theme.palette.grey[900],
          0.75
        )}, ${addCssColorAlpha(theme.palette.grey[900], 0.25)})`
      }
    }),
  { name: 'TwSocialShareMenu' }
);
