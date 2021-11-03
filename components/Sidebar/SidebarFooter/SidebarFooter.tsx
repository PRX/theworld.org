/**
 * @file SidebarFooter.tsx
 * Component for Footers in sidebar items.
 */

import { HTMLAttributes } from 'react';
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
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
