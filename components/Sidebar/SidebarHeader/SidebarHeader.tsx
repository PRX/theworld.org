/**
 * @file SidebarHeader.tsx
 * Component for headers in sidebar items.
 */

import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { sidebarHeaderStyles } from './SidebarHeader.styles';

export interface ISidebarHeaderProps extends BoxProps {}

export const SidebarHeader = ({
  children,
  className,
  ...other
}: ISidebarHeaderProps) => {
  const { classes, cx } = sidebarHeaderStyles();

  return (
    <Box component="header" {...other} className={cx(classes.root, className)}>
      {children}
    </Box>
  );
};
