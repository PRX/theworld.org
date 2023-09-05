/**
 * @file SidebarLatestStories.tsx
 * Component for sidebar latest story links list.
 */

import type { PostStory, RootState } from '@interfaces';
import { useStore } from 'react-redux';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { MenuBookRounded, NavigateNext } from '@mui/icons-material';
import { getAppDataLatestStories } from '@store/reducers';
import { Sidebar } from '../Sidebar';
import { SidebarHeader } from '../SidebarHeader';
import { SidebarFooter } from '../SidebarFooter';
import { SidebarList, SidebarListItem } from '../SidebarList';

export interface SidebarLatestStoriesProps {
  data?: PostStory[];
  label?: string;
}

export const SidebarLatestStories = ({
  data,
  label
}: SidebarLatestStoriesProps) => {
  const store = useStore<RootState>();
  const state = store.getState();
  const latestStories = getAppDataLatestStories(state);
  const stories = data || latestStories;
  const listItems = stories?.map<SidebarListItem>((story) => ({
    data: story,
    ...(story.additionalMedia?.audio && {
      audio: story.additionalMedia.audio
      // audioProps: {
      //   title: additionalMedia.audio.audioFields?.audioTitle || title
      // }
    })
  }));

  if (!listItems?.length) return null;

  return (
    <Sidebar item elevated>
      <SidebarHeader>
        <MenuBookRounded />
        <Typography variant="h2">{label || 'Latest Headlines'}</Typography>
      </SidebarHeader>
      <SidebarList disablePadding data={listItems} />
      <SidebarFooter>
        <Link
          href="/[...alias]"
          as="/programs/the-world"
          passHref
          legacyBehavior
        >
          <Button
            component="a"
            color="primary"
            variant="contained"
            fullWidth
            disableElevation
          >
            More stories <NavigateNext />
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};
