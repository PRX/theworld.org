/**
 * @file SidebarFooter.tsx
 * Component for Footers in sidebar items.
 */

import React, { HTMLAttributes } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import classNames from 'classnames/bind';
import {
  sidebarFooterStyles,
  sidebarFooterTheme
} from './SidebarFooter.styles';

interface ISidebarFooterProps extends HTMLAttributes<{}> {}

export const SidebarFooter = ({ children, className }: ISidebarFooterProps) => {
  const classes = sidebarFooterStyles({});
  const cx = classNames.bind(classes);

  return (
    <ThemeProvider theme={sidebarFooterTheme}>
      <Box component="footer" className={cx(className, 'root')}>
        {children}
      </Box>
    </ThemeProvider>
  );
};
