/**
 * @file SidebarLatestStories.tsx
 * Component for sidebar latest story links list.
 */

import type { RootState } from '@interfaces';
import React from 'react';
import { useStore } from 'react-redux';
import Link from 'next/link';
import { IPriApiResource } from 'pri-api-library/types';
import { Button, Typography } from '@mui/material';
import { MenuBookRounded, NavigateNext } from '@mui/icons-material';
import { getCollectionData } from '@store/reducers';
import { Sidebar } from '../Sidebar';
import { SidebarHeader } from '../SidebarHeader';
import { SidebarFooter } from '../SidebarFooter';
import { SidebarList } from '../SidebarList';

export interface SidebarLatestStoriesProps {
  data?: IPriApiResource[];
  label?: string;
}

export const SidebarLatestStories = ({
  data,
  label
}: SidebarLatestStoriesProps) => {
  const store = useStore<RootState>();
  const state = store.getState();
  const listItems =
    data || getCollectionData(state, 'app', undefined, 'latest')?.items[1];

  return listItems?.length ? (
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
  ) : null;
};
