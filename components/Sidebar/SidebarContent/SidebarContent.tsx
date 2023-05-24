/**
 * @file SidebarContent.tsx
 * Component for Footers in sidebar items.
 */

import React, { HTMLAttributes } from 'react';
import { CardContent } from '@mui/material';
import { sidebarContentStyles } from './SidebarContent.styles';

interface ISidebarContentProps extends HTMLAttributes<{}> {}

export const SidebarContent = ({
  children,
  className
}: ISidebarContentProps) => {
  const { classes, cx } = sidebarContentStyles();

  return (
    <CardContent className={cx(classes.root, className)}>
      {children}
    </CardContent>
  );
};
