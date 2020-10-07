/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React, { HTMLAttributes } from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames/bind';
import { landingPageStyles } from './LandingPage.styles';

interface ILandingPageProps extends HTMLAttributes<{}> {
  container?: boolean;
  header?: boolean;
  main?: boolean;
  sidebar?: boolean;
}

export const LandingPage = ({
  children,
  className,
  container,
  header,
  main,
  sidebar
}: ILandingPageProps) => {
  const classes = landingPageStyles({});
  const cx = classNames.bind(classes);

  return (
    <Box
      className={cx(className, {
        root: true,
        container,
        item: !container,
        header,
        main,
        sidebar
      })}
    >
      {children}
    </Box>
  );
};
