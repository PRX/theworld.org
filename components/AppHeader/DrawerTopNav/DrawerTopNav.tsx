/**
 * @file DrawerTopNav.tsx
 * Component for app drawer top nav.
 */

import React from 'react';
import { useStore } from 'react-redux';
import { Button, ButtonGroup } from '@material-ui/core';
import { handleButtonClick } from '@lib/routing';
import { getMenusData } from '@store/reducers';
import { drawerTopNavStyles } from './DrawerTopNav.styles';

export const DrawerTopNav = () => {
  const store = useStore();
  const drawerTopNav = getMenusData(store.getState(), 'drawerTopNav');
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
