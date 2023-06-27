/**
 * @file SidebarList.tsx
 * Component for link lists in sidebar.
 */

import type { IAudioData } from '@components/Player/types';
import type {
  ContentNode,
  Maybe,
  MediaItem,
  NodeWithFeaturedImage,
  NodeWithTitle,
  TermNode
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
import { Person } from '@mui/icons-material';
import { ContentLink } from '@components/ContentLink';
import { AudioControls } from '@components/Player/components';
import { sidebarListStyles } from './SidebarList.styles';

export type SidebarListItem = {
  title?: Maybe<string>;
  url?: Maybe<string>;
  audio?: Maybe<MediaItem>;
  audioProps?: Partial<IAudioData>;
  avatar?: Maybe<MediaItem>;
  data?:
    | (ContentNode & NodeWithTitle & NodeWithFeaturedImage)
    | TermNode
    | null;
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
        {data.map((item) => {
          const text =
            item.title ||
            (item.data &&
              (('title' in item.data && item.data?.title) ||
                ('name' in item.data && item.data?.name)));
          const url = item.url || item.data?.link;
          return item.data ? (
            <ListItemButton
              component={ContentLink}
              url={url}
              key={item.data.id}
            >
              {item.avatar && (
                <ListItemAvatar>
                  {item.avatar.sourceUrl ? (
                    <Avatar
                      component={Image}
                      alt={`Avatar of ${text}`}
                      src={item.avatar.sourceUrl}
                      aria-hidden
                    />
                  ) : (
                    <Avatar className={classes.noAvatarImage} aria-hidden>
                      {text ? (
                        [...text.matchAll(/\b[A-Z]/g)].join('')
                      ) : (
                        <Person />
                      )}
                    </Avatar>
                  )}
                </ListItemAvatar>
              )}
              <ListItemText {...listItemTextProps}>{text}</ListItemText>
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
            (url && (
              <ListItemButton component="a" href={url} key={url}>
                <ListItemText {...listItemTextProps}>{text}</ListItemText>
              </ListItemButton>
            )) || <ListItemText {...listItemTextProps}>{text}</ListItemText>
          );
        })}
      </List>
    )
  );
};
