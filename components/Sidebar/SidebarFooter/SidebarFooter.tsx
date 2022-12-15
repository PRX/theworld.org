/**
 * @file SidebarFooter.tsx
 * Component for Footers in sidebar items.
 */

import React, { HTMLAttributes } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import {
  sidebarFooterStyles,
  sidebarFooterTheme
} from './SidebarFooter.styles';

interface ISidebarFooterProps extends HTMLAttributes<{}> {}

export const SidebarFooter = ({ children, className }: ISidebarFooterProps) => {
  const { classes, cx } = sidebarFooterStyles();

  return (
    <ThemeProvider theme={sidebarFooterTheme}>
      <Box component="footer" className={cx(className, 'root')}>
        {children}
      </Box>
    </ThemeProvider>
  );
};
