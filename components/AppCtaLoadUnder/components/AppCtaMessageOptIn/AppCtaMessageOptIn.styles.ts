/**
 * @file AppCtaMessageOptIn.style.ts
 * Styles for AppCtaMessageOptIn.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const appCtaMessageOptInStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    controls: {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: '1fr max-content',
        alignItems: 'center'
      }
    }
  })
);
