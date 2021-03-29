/**
 * @file SidebarContent.tsx
 * Component for Footers in sidebar items.
 */

import React, { HTMLAttributes } from 'react';
import { CardContent } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import {
  sidebarContentStyles,
  sidebarContentTheme
} from './SidebarContent.styles';

interface ISidebarContentProps extends HTMLAttributes<{}> {}

export const SidebarContent = ({
  children,
  className
}: ISidebarContentProps) => {
  const classes = sidebarContentStyles({});
  const cx = classNames.bind(classes);

  return (
    <ThemeProvider theme={sidebarContentTheme}>
      <CardContent className={cx(className, 'root')}>{children}</CardContent>
    </ThemeProvider>
  );
};
