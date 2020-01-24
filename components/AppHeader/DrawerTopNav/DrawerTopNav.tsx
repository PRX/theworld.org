/**
 * @file DrawerTopNav.tsx
 * Component for app drawer top nav.
 */

import React, { useContext } from 'react';
import { handleButtonClick } from '@lib/routing';
// Material
import { Button, ButtonGroup } from '@material-ui/core';
import { drawerTopNavStyles } from './DrawerTopNav.styles';
// Contexts
import AppContext from '@contexts/AppContext';

export default () => {
  const {
    menus: {  drawerTopNav }
  } = useContext(AppContext);
  const classes = drawerTopNavStyles({});

  return (
    drawerTopNav && (
      <ButtonGroup
        className={classes.root}
        variant="contained"
        color="secondary"
        fullWidth={true}
        disableRipple={true}
      >
        {drawerTopNav.map(({ name, url, key }) => (
          <Button onClick={handleButtonClick(url)} key={key} disableRipple={true}>
            {name}
          </Button>
        ))}
      </ButtonGroup>
    )
  );
};
