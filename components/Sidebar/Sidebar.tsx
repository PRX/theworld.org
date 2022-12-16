/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React, { HTMLAttributes } from 'react';
import { Box } from '@mui/material';
import { sidebarStyles } from './Sidebar.styles';

export interface ISidebarProps extends HTMLAttributes<{}> {
  container?: boolean;
  item?: boolean;
  stretch?: boolean;
  elevated?: boolean;
}

export const Sidebar = ({
  children,
  className,
  container,
  item,
  stretch,
  elevated
}: ISidebarProps) => {
  const { cx } = sidebarStyles();
  const component = item ? 'aside' : null;

  return (
    <Box
      component={component}
      className={cx(className, 'root', {
        container,
        item,
        stretch,
        elevated
      })}
    >
      {children}
    </Box>
  );
};
