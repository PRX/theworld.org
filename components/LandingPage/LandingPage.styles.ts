/**
 * @file LandingPage.style.ts
 * Styles for LandingPage.
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const landingPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: '1fr 568px 320px 1fr',
        gridGap: `${theme.spacing(3)}px`,
        paddingTop: `${theme.spacing(3)}px`
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '1fr 808px 400px 1fr'
      }
    },
    item: {
      margin: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
      [theme.breakpoints.up('md')]: {
        margin: 0
      }
    },
    header: {
      gridColumn: '1 / -1',
      margin: 0
    },
    feature: {
      gridColumn: 2
    },
    main: {
      gridColumn: 2
    },
    sidebarFeature: {
      gridColumn: 3
    },
    sidebarMain: {
      gridColumn: 3
    }
  })
);
