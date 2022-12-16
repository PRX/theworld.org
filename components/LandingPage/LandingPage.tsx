/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React, { Fragment, ReactNode } from 'react';
import {
  Box,
  BoxProps,
  Container,
  Grid,
  GridSpacing,
  Hidden
} from '@mui/material';

export interface ILandingPageItem {
  key: string;
  children: ReactNode;
}
export interface ILandingPageProps extends BoxProps {
  main: ILandingPageItem[];
  sidebar: ILandingPageItem[];
  spacing?: GridSpacing;
}

export const LandingPage = ({
  main,
  sidebar,
  spacing,
  gap,
  ...other
}: ILandingPageProps) => {
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
    <Box {...other}>
      <Container fixed>
        <Grid container spacing={spacing || 3}>
          <Grid item xs={12} md={8}>
            <Box display="grid" gap={gap}>
              {mainItems.map(
                ({ key, children }: ILandingPageItem) =>
                  children && <Fragment key={key}>{children}</Fragment>
              )}
            </Box>
          </Grid>
          <Grid item xs md={4}>
            <Hidden smDown implementation="css">
              <Box display="grid" gap={gap}>
                {sidebar.map(
                  ({ key, children }: ILandingPageItem) =>
                    children && <Fragment key={key}>{children}</Fragment>
                )}
              </Box>
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
