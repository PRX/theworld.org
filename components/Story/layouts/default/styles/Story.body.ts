/**
 * @file body.ts
 * Body styles as JSS object.
 */

import { createStyles, Theme } from '@material-ui/core/styles';
import { mediaStyles, qaStyles, typographyStyles } from './body';

export default (theme: Theme) =>
  createStyles({
    body: {
      ...typographyStyles(theme),
      ...mediaStyles(theme),
      ...qaStyles(theme)
    }
  });
