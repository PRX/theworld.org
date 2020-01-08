/**
 * @file body.ts
 * Body styles as JSS object.
 */

import { createStyles, Theme } from '@material-ui/core/styles';
import { mediaStyles, typographyStyles } from './body';
import { CreateCSSProperties } from '@material-ui/styles';

export default (theme: Theme) =>
  createStyles({
    body: {
      ...typographyStyles(theme),
      ...mediaStyles(theme)
    }
  });
