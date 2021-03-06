/**
 * @file SidebarList.tsx
 * Component for link lists in sidebar.
 */

import React from 'react';
import {
  List,
  ListProps,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentLink } from '@components/ContentLink';
import { sidebarListStyles, sidebarListTheme } from './SidebarList.styles';

interface ISidebarListProps extends ListProps {
  data: IPriApiResource[];
  formatTitle?: (data: IPriApiResource) => string;
}

export const SidebarList = ({
  className,
  data,
  formatTitle,
  ...other
}: ISidebarListProps) => {
  const classes = sidebarListStyles({});
  const cx = classNames.bind(classes);
  const listClasses = cx(className, {
    root: true
  });
  const getTitle = (item: IPriApiResource) =>
    formatTitle ? formatTitle(item) : item.title;

  return (
    <ThemeProvider theme={sidebarListTheme}>
      <List className={listClasses} {...other}>
        {data.map(item =>
          item.id ? (
            <ListItem button component={ContentLink} data={item} key={item.id}>
              {item.avatar && (
                <ListItemAvatar>
                  <Avatar
                    alt={getTitle(item)}
                    src={item.avatar.styles.w128.src}
                  />
                </ListItemAvatar>
              )}
              <ListItemText className={cx({ noBullet: !!item.avatar })}>
                {getTitle(item)}
              </ListItemText>
            </ListItem>
          ) : (
            <ListItem button component="a" href={item.url} key={item.url}>
              <ListItemText>{item.title}</ListItemText>
            </ListItem>
          )
        )}
      </List>
    </ThemeProvider>
  );
};
