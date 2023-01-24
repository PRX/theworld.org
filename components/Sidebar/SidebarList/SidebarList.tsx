/**
 * @file SidebarList.tsx
 * Component for link lists in sidebar.
 */

import React from 'react';
import {
  List,
  ListProps,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListSubheader,
  ListItemSecondaryAction,
  ListItemButton
} from '@mui/material';
import { IPriApiResource } from 'pri-api-library/types';
import { ContentLink } from '@components/ContentLink';
import { AudioControls } from '@components/Player/components';
import { sidebarListStyles } from './SidebarList.styles';

export interface ISidebarListProps extends ListProps {
  data: IPriApiResource[];
  // eslint-disable-next-line no-unused-vars
  formatTitle?(data: IPriApiResource): string;
  subheaderText?: string;
}

export const SidebarList = ({
  className,
  data,
  formatTitle,
  subheaderText,
  ...other
}: ISidebarListProps) => {
  const { classes, cx } = sidebarListStyles();
  const listClasses = cx(classes.root, className);
  const listProps = {
    component: 'nav',
    className: listClasses,
    ...other,
    ...(subheaderText && {
      subheader: (
        <ListSubheader
          classes={{ root: classes.MuiListSubheaderRoot }}
          component="header"
          disableSticky
        >
          {subheaderText}
        </ListSubheader>
      )
    })
  } as ListProps;
  const getTitle = (item: IPriApiResource) =>
    formatTitle ? formatTitle(item) : (item.title as string);

  const renderItemContent = (item: IPriApiResource) => {
    const text = getTitle(item);
    switch (item.type) {
      case 'file--audio':
        return (
          <ListItemButton component={ContentLink} data={item} key={item.id}>
            <ListItemText className={cx('noBullet')}>{text}</ListItemText>
            <ListItemSecondaryAction>
              <AudioControls
                id={item.id as string}
                variant="minimal"
                fallbackProps={{
                  title: text,
                  queuedFrom: 'Sidebar List Controls',
                  linkResource: item
                }}
              />
            </ListItemSecondaryAction>
          </ListItemButton>
        );

      case 'node--people':
        return (
          <ListItemButton component={ContentLink} data={item} key={item.id}>
            <ListItemAvatar>
              {item.avatar ? (
                <Avatar
                  alt={`${text}'s Avatar`}
                  src={item.avatar.styles.w128.src}
                  aria-hidden
                />
              ) : (
                <Avatar className={classes.noAvatarImage} aria-hidden>
                  {[...text.matchAll(/\b[A-Z]/g)].join('')}
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText className={cx('noBullet')}>{text}</ListItemText>
          </ListItemButton>
        );

      case 'node--stories':
        if (item.audio) {
          return (
            <ListItemButton key={item.id}>
              <ListItemText className={cx('noBullet')}>
                <ContentLink data={item}>{text}</ContentLink>
              </ListItemText>
              <ListItemSecondaryAction>
                <AudioControls
                  id={item.audio.id as string}
                  fallbackProps={{
                    title: item.title,
                    queuedFrom: 'Sidebar List Controls',
                    ...(item.image && { imageUrl: item.image.url }),
                    linkResource: item
                  }}
                  variant="minimal"
                />
              </ListItemSecondaryAction>
            </ListItemButton>
          );
        }

        return (
          <ListItemButton component={ContentLink} data={item} key={item.id}>
            <ListItemText className={cx('noBullet')}>{text}</ListItemText>
          </ListItemButton>
        );

      default:
        return (
          <ListItemButton component={ContentLink} data={item} key={item.id}>
            <ListItemText>{text}</ListItemText>
          </ListItemButton>
        );
    }
  };

  return (
    !!data && (
      <List {...listProps}>
        {data.map(item =>
          item.id ? (
            renderItemContent(item)
          ) : (
            <ListItemButton component="a" href={item.url} key={item.url}>
              <ListItemText>{item.title}</ListItemText>
            </ListItemButton>
          )
        )}
      </List>
    )
  );
};
