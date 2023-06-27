/**
 * @file DrawerTopNav.tsx
 * Component for app drawer top nav.
 */

import type { RootState } from '@interfaces';
import React from 'react';
import { useStore } from 'react-redux';
import { parse } from 'url';
import { Button, ButtonGroup } from '@mui/material';
import { isLocalUrl } from '@lib/parse/url';
import { handleButtonClick } from '@lib/routing';
import { getMenusData } from '@store/reducers';
import { drawerTopNavStyles } from './DrawerTopNav.styles';

export const DrawerTopNav = () => {
  const store = useStore<RootState>();
  const drawerTopNav = getMenusData(store.getState(), 'drawerTopNav');
  const { classes } = drawerTopNavStyles();

  return (
    (drawerTopNav && (
      <ButtonGroup
        className={classes.root}
        variant="contained"
        color="secondary"
        fullWidth
        disableRipple
      >
        {drawerTopNav
          .map(({ url, ...other }) => ({ ...other, url: parse(url) }))
          .map(({ name, url, key, attributes }) => (
            <Button
              component="a"
              href={isLocalUrl(url.href) ? url.path || '/' : url.href}
              onClick={handleButtonClick(url)}
              key={key}
              disableRipple
              {...attributes}
            >
              {name}
            </Button>
          ))}
      </ButtonGroup>
    )) ||
    null
  );
};
