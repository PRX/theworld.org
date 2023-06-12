/**
 * @file SidebarList.tsx
 * Component for link lists in sidebar.
 */

import type { IAudioData } from '@components/Player/types';
import type {
  ContentNode,
  MediaItem,
  NodeWithFeaturedImage
} from '@interfaces';
import Image from 'next/image';
import {
  List,
  ListProps,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListSubheader,
  ListItemSecondaryAction,
  ListItemButton,
  ListItemTextProps
} from '@mui/material';
import { ContentLink } from '@components/ContentLink';
import { AudioControls } from '@components/Player/components';
import { sidebarListStyles } from './SidebarList.styles';

export type SidebarListItem = {
  title: string;
  url: string;
  audio?: MediaItem;
  audioProps?: Partial<IAudioData>;
  avatar?: MediaItem;
  data?: ContentNode & NodeWithFeaturedImage;
};
export interface ISidebarListProps extends ListProps {
  data: SidebarListItem[];
  subheaderText?: string;
  bulleted?: boolean;
}

export const SidebarList = ({
  className,
  data,
  subheaderText,
  bulleted = false,
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
  const listItemTextProps = {
    className: cx({ noBullet: !bulleted })
  } as ListItemTextProps;

  return (
    !!data && (
      <List {...listProps}>
        {data.map((item) =>
          item.data ? (
            <ListItemButton
              component={ContentLink}
              url={item.url}
              key={item.data.id}
            >
              {item.avatar && (
                <ListItemAvatar>
                  {item.avatar.sourceUrl ? (
                    <Avatar
                      component={Image}
                      alt={`Avatar of ${item.title}`}
                      src={item.avatar.sourceUrl}
                      aria-hidden
                    />
                  ) : (
                    <Avatar className={classes.noAvatarImage} aria-hidden>
                      {[...item.title.matchAll(/\b[A-Z]/g)].join('')}
                    </Avatar>
                  )}
                </ListItemAvatar>
              )}
              <ListItemText {...listItemTextProps}>{item.title}</ListItemText>
              {item.audio && (
                <ListItemSecondaryAction>
                  <AudioControls
                    id={item.audio.id}
                    fallbackProps={item.audioProps}
                    variant="minimal"
                  />
                </ListItemSecondaryAction>
              )}
            </ListItemButton>
          ) : (
            <ListItemButton component="a" href={item.url} key={item.url}>
              <ListItemText {...listItemTextProps}>{item.title}</ListItemText>
            </ListItemButton>
          )
        )}
      </List>
    )
  );
};
