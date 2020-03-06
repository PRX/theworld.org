/**
 * @file SidebarHeader.tsx
 * Component for headers in sidebar items.
 */

import React, { HTMLAttributes } from 'react';
import {
  Box
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import { sidebarHeaderStyles, sidebarHeaderTheme } from './SidebarHeader.styles';

interface ISidebarHeaderProps extends HTMLAttributes<{}> {}

export const SidebarHeader = ({ children, className }: ISidebarHeaderProps) => {
  const classes = sidebarHeaderStyles({});
  const cx = classNames.bind(classes);

  return (
    <ThemeProvider theme={sidebarHeaderTheme}>
      <Box component="header" className={cx(className, { root: true })}>
        {children}
      </Box>
    </ThemeProvider>
  );
};
