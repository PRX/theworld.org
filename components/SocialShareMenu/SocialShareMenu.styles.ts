/**
 * @file SocialShareMenu.style.ts
 * Styles for SocialShareMenu.
 */

import { addCssColorAlpha } from '@lib/parse/color';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useSocialShareMenuStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        position: 'relative',
        zIndex: theme.zIndex.speedDial,
        pointerEvents: 'none'
      },
      fab: {
        pointerEvents: 'all'
      },
      actionsClosed: {
        pointerEvents: 'none'
      },
      staticTooltipLabel: {
        backgroundColor: 'transparent',
        color: theme.palette.common.white,
        fontWeight: theme.typography.fontWeightBold,
        paddingRight: 0
      },
      backdropRoot: {
        top: 'unset',
        height: '100vh',
        backgroundImage: `linear-gradient(-45deg, ${addCssColorAlpha(
          theme.palette.grey[900],
          0.75
        )}, ${addCssColorAlpha(theme.palette.grey[900], 0.25)})`
      }
    }),
  { name: 'TwSocialShareMenu' }
);
