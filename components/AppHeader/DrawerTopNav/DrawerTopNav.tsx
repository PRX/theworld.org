/**
 * @file DrawerTopNav.tsx
 * Component for app drawer top nav.
 */

import React, { useContext } from 'react';
import { handleButtonClick } from '@lib/routing';
import { Button, ButtonGroup } from '@material-ui/core';
import { AppContext } from '@contexts/AppContext';
import { drawerTopNavStyles } from './DrawerTopNav.styles';

export const DrawerTopNav = () => {
  const {
    menus: { drawerTopNav }
  } = useContext(AppContext);
  const classes = drawerTopNavStyles({});

  return (
    (drawerTopNav && (
      <ButtonGroup
        className={classes.root}
        variant="contained"
        color="secondary"
        fullWidth
        disableRipple
      >
        {drawerTopNav.map(({ name, url, key }) => (
          <Button onClick={handleButtonClick(url)} key={key} disableRipple>
            {name}
          </Button>
        ))}
      </ButtonGroup>
    )) ||
    null
  );
};
