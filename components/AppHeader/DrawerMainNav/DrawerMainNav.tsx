/**
 * @file DrawerMainNav.tsx
 * Component for app drawer top nav.
 */

import React, { useContext, useState } from 'react';
import { handleButtonClick } from '@lib/routing';
import { IButton } from '@interfaces';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ThemeProvider
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AppContext } from '@contexts/AppContext';
import {
  drawerMainNavTheme,
  drawerMainNavStyles
} from './DrawerMainNav.styles';

export interface OpenStateMap {
  [k: string]: boolean;
}

export const DrawerMainNav = () => {
  const { data } = useContext(AppContext);
  const { menus } = data || {};
  const { drawerMainNav } = menus || {};
  const [{ open }, setState] = useState({
    open: drawerMainNav
      ? drawerMainNav.reduce(
          (a: OpenStateMap, { children, key }: IButton): OpenStateMap => {
            if (children) {
              const b = {
                ...a,
                [key]: false
              };

              return b;
            }

            return a;
          },
          {}
        )
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
          {drawerMainNav.map(
            ({ name, url, key, children }, index: number) =>
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
          )}
        </List>
      </ThemeProvider>
    )) ||
    null
  );
};
