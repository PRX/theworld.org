/**
 * @file DrawerTopNav.tsx
 * Component for app drawer top nav.
 */

import { useContext } from 'react';
import { parse } from 'url';
import { Button, ButtonGroup } from '@mui/material';
import { isLocalUrl } from '@lib/parse/url';
import { handleButtonClick } from '@lib/routing';
import { AppContext } from '@contexts/AppContext';
import { drawerTopNavStyles } from './DrawerTopNav.styles';

export const DrawerTopNav = () => {
  const {
    data
  } = useContext(AppContext);
  const {
    menus
  } = data || {};
  const {
    drawerTopNav
  } = menus || {};
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
