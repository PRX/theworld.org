/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { HTMLAttributes } from 'react';
import {
  Box
} from '@material-ui/core';
import classNames from 'classnames/bind';
import { sidebarStyles } from './Sidebar.styles';

interface ISidebarProps extends HTMLAttributes<{}> {
  container?: boolean,
  item?: boolean,
  stretch?: boolean
}

export const Sidebar = ({ children, className, container, item, stretch }: ISidebarProps) => {
  const classes = sidebarStyles({});
  const cx = classNames.bind(classes);

  return (
    <Box className={cx(className, { root: true, container, item, stretch })}>
      {children}
    </Box>
  );
};
