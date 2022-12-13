/**
 * @file SidebarHeader.tsx
 * Component for headers in sidebar items.
 */

import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import clsx from 'clsx';
import {
  sidebarHeaderStyles,
  sidebarHeaderTheme
} from './SidebarHeader.styles';

export interface ISidebarHeaderProps extends BoxProps {}

export const SidebarHeader = ({
  children,
  className,
  ...other
}: ISidebarHeaderProps) => {
  const classes = sidebarHeaderStyles({});

  return (
    <ThemeProvider theme={sidebarHeaderTheme}>
      <Box
        component="header"
        {...other}
        className={clsx(className, classes.root)}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};
