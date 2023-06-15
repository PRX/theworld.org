/**
 * @file SidebarAudioList.tsx
 * Component for audio list in sidebar items.
 */

import React from 'react';
import { ListProps } from '@mui/material';
import { IPriApiResource } from 'pri-api-library/types';
import { SidebarList } from '../SidebarList';

interface ISidebarAudioListProps extends ListProps {
  data: IPriApiResource[];
}

export const SidebarAudioList = ({
  data,
  ...other
}: ISidebarAudioListProps) => {
  const linksList =
    data &&
    data.map((item: IPriApiResource) =>
      item.usage && item.usage.story
        ? { ...item.usage.story[0], audio: item }
        : item
    );

  return linksList && <SidebarList data={linksList} {...other} />;
};
