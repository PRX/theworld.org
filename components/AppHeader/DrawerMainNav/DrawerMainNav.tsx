/**
 * @file DrawerMainNav.tsx
 * Component for app drawer top nav.
 */

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { handleButtonClick, generateLinkHrefFromUrl } from '@lib/routing';
import { IButton } from '@interfaces';
// Material
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { drawerMainNavStyles } from './DrawerMainNav.styles';
// Contexts
import AppContext from '@contexts/AppContext';

export default () => {
  const {
    menus: {  drawerMainNav }
  } = useContext(AppContext);
  const [{ open }, setState] = useState({
    open: drawerMainNav.reduce((a: IButton, { children, key }) => {
      if (children) {
        const b = {
          ...a,
          [key]: false
        }

        return b
      }

      return a;
    }, {})
  })
  const classes = drawerMainNavStyles({});

  const handleToggleCollapse = (key: string | number) => () => {
    setState({
      open: {
        ...open,
        [key]: !open[key]
      }
    });
  };

  return (
    drawerMainNav && (
      <List
        component="nav"
        className={classes.root}
        disablePadding={true}
      >
        {drawerMainNav.map(({ name, url, key, children }) => (
          (children && (
            <React.Fragment key={key}>
              <ListItem button onClick={handleToggleCollapse(key)}>
                <ListItemText primary={name} />
              </ListItem>
              <Collapse in={open[key]}>
                <List component="nav" className={classes.subMenu}>
                  {children.map(({ name, url, key }) => (
                    <ListItem button onClick={handleButtonClick(url)} key={key}>
                      <ListItemText>
                        <Link href={generateLinkHrefFromUrl(url)} as={url.pathname}>{name}</Link>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          )) || (
            <ListItem button onClick={handleButtonClick(url)}>
              <ListItemText primary={name}/>
            </ListItem>
          )
        ))}
      </List>
    )
  );
};
