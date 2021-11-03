/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import { HTMLAttributes } from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames/bind';
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
  const classes = sidebarStyles({});
  const cx = classNames.bind(classes);
  const component = item ? 'aside' : null;

  return (
    <Box
      component={component}
      className={cx(className, {
        root: true,
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
