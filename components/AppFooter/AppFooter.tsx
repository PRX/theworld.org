/**
 * @file AppFooter.tsx
 * Component for links to content page.
 */

import React, { useContext } from 'react';
// Material Components
import {
  Box
} from '@material-ui/core';
import { appFooterStyles } from './AppFooter.styles';
// Contexts
import {default as TwAppContext} from '@contexts/AppContext';

export default () => {
  const {
    menus: {
      footerNav
    }
  } = useContext(TwAppContext);
  const classes = appFooterStyles({});

  return (
    <Box className={classes.root} height={350} mt={3} />
  );
};
