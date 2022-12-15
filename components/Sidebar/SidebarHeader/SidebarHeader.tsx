/**
 * @file SidebarHeader.tsx
 * Component for headers in sidebar items.
 */

import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
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
  const { cx } = sidebarHeaderStyles();

  return (
    <ThemeProvider theme={sidebarHeaderTheme}>
      <Box component="header" {...other} className={cx(className, 'root')}>
        {children}
      </Box>
    </ThemeProvider>
  );
};
