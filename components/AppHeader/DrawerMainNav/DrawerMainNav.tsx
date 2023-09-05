/**
 * @file DrawerMainNav.tsx
 * Component for app drawer top nav.
 */

import type { IButton, RootState } from '@interfaces';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { handleButtonClick } from '@lib/routing';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ThemeProvider
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { getAppDataMenu } from '@store/reducers';
import {
  drawerMainNavTheme,
  drawerMainNavStyles
} from './DrawerMainNav.styles';

export interface OpenStateMap {
  [k: string]: boolean;
}

const genOpenStateMapKey = (button: IButton, index: number) =>
  button.key || `${button.name}:${index}`;

export const DrawerMainNav = () => {
  const store = useStore<RootState>();
  const state = store.getState();
  const drawerMainNav = getAppDataMenu(state, 'drawerMainNav');
  const [{ open }, setState] = useState({
    open: drawerMainNav
      ? drawerMainNav.reduce((a: OpenStateMap, btn, index): OpenStateMap => {
          if (btn.children) {
            const b = {
              ...a,
              [genOpenStateMapKey(btn, index)]: false
            };

            return b;
          }

          return a;
        }, {})
      : {}
  });
  const { classes, cx } = drawerMainNavStyles();

  const handleToggleCollapse = (key: string | number) => () => {
    setState({
      open: {
        ...open,
        [key]: !open[key]
      }
    });
  };

  return (
    (drawerMainNav && (
      <ThemeProvider theme={drawerMainNavTheme}>
        <List component="nav" className={classes.root} disablePadding>
          {drawerMainNav.map((btn, index: number) => {
            const { name, url, children } = btn;
            const key = genOpenStateMapKey(btn, index);
            return (
              (children && (
                <Box className={classes.accordion} key={key}>
                  <ListItemButton
                    onClick={handleToggleCollapse(key)}
                    className={cx({
                      opened: open[key]
                    })}
                  >
                    <ListItemText primary={name} />
                    <ExpandMore
                      className={cx(classes.expandIndicator, {
                        opened: open[key]
                      })}
                    />
                  </ListItemButton>
                  <Collapse in={open[key]} data-index={index}>
                    <List
                      component="nav"
                      className={classes.subMenu}
                      disablePadding
                    >
                      {children.map(
                        ({ name: childName, url: childUrl, key: childKey }) => (
                          <ListItemButton
                            className={classes.subMenuItem}
                            onClick={handleButtonClick(childUrl)}
                            key={childKey}
                          >
                            <ListItemText primary={childName} />
                          </ListItemButton>
                        )
                      )}
                    </List>
                  </Collapse>
                </Box>
              )) || (
                <ListItemButton
                  onClick={handleButtonClick(url)}
                  data-index={index}
                >
                  <ListItemText primary={name} />
                </ListItemButton>
              )
            );
          })}
        </List>
      </ThemeProvider>
    )) ||
    null
  );
};
