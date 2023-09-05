/**
 * @file DrawerTopNav.tsx
 * Component for app drawer top nav.
 */

import type { IButtonWithUrl, RootState } from '@interfaces';
import { useStore } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material';
import { isLocalUrl } from '@lib/parse/url';
import { handleButtonClick } from '@lib/routing';
import { getAppDataMenu } from '@store/reducers';
import { drawerTopNavStyles } from './DrawerTopNav.styles';

export const DrawerTopNav = () => {
  const store = useStore<RootState>();
  const state = store.getState();
  const drawerTopNav = getAppDataMenu(state, 'drawerTopNav');
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
          .filter((v): v is IButtonWithUrl => !!v.url)
          .map(({ url, ...other }) => ({
            ...other,
            url: new URL(url, 'https://theworld.org')
          }))
          .map(({ name, url, key, attributes }) => (
            <Button
              component="a"
              href={isLocalUrl(url.href) ? url.pathname || '/' : url.href}
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
