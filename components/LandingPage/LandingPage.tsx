/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import { Fragment, ReactNode } from 'react';
import { Container, Grid, Hidden } from '@material-ui/core';

export interface ILandingPageItem {
  key: string;
  children: ReactNode;
}
export interface ILandingPageProps {
  main: ILandingPageItem[];
  sidebar: ILandingPageItem[];
}

export const LandingPage = ({ main, sidebar }: ILandingPageProps) => {
  const max = Math.max(main.length, sidebar.length);
  const mainItems = [];

  // Interlace main items with sidebar items wrapped in Hidden elements.
  for (let index = 0; index < max; index += 1) {
    if (main[index]) {
      mainItems.push(main[index]);
    }
    if (sidebar[index]) {
      mainItems.push({
        ...sidebar[index],
        children: <Hidden mdUp>{sidebar[index].children}</Hidden>
      });
    }
  }

  return (
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {mainItems.map(
            ({ key, children }: ILandingPageItem) =>
              children && <Fragment key={key}>{children}</Fragment>
          )}
        </Grid>
        <Grid item xs md={4}>
          <Hidden smDown implementation="css">
            {sidebar.map(
              ({ key, children }: ILandingPageItem) =>
                children && <Fragment key={key}>{children}</Fragment>
            )}
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
};
