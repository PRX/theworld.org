/**
 * @file DrawerMainNav.tsx
 * Component for app drawer top nav.
 */

import React, { useContext, useState } from 'react';
import { handleButtonClick } from '@lib/routing';
import { IButton } from '@interfaces';
import classNames from 'classnames/bind';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ThemeProvider
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { AppContext } from '@contexts/AppContext';
import {
  drawerMainNavTheme,
  drawerMainNavStyles
} from './DrawerMainNav.styles';

export interface OpenStateMap {
  [k: string]: boolean;
}

export const DrawerMainNav = () => {
  const {
    menus: { drawerMainNav }
  } = useContext(AppContext);
  const [{ open }, setState] = useState({
    open: drawerMainNav.reduce(
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
  });
  const classes = drawerMainNavStyles({});
  const cx = classNames.bind(classes);

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
                  <ListItem
                    button
                    onClick={handleToggleCollapse(key)}
                    className={cx({
                      opened: open[key]
                    })}
                  >
                    <ListItemText primary={name} />
                    <ExpandMore
                      className={cx({
                        expandIndicator: true,
                        opened: open[key]
                      })}
                    />
                  </ListItem>
                  <Collapse in={open[key]} data-index={index}>
                    <List
                      component="nav"
                      className={classes.subMenu}
                      disablePadding
                    >
                      {children.map(
                        ({ name: childName, url: childUrl, key: childKey }) => (
                          <ListItem
                            button
                            className={classes.subMenuItem}
                            onClick={handleButtonClick(childUrl)}
                            key={childKey}
                          >
                            <ListItemText primary={childName} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Collapse>
                </Box>
              )) || (
                <ListItem
                  button
                  onClick={handleButtonClick(url)}
                  data-index={index}
                >
                  <ListItemText primary={name} />
                </ListItem>
              )
          )}
        </List>
      </ThemeProvider>
    )) ||
    null
  );
};
