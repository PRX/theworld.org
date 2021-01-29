/**
 * @file SidebarAudioList.tsx
 * Component for audio list in sidebar items.
 */

import React from 'react';
import { ListProps } from '@material-ui/core';
import { IPriApiResource } from 'pri-api-library/types';
import { SidebarList } from '../SidebarList';

interface ISidebarAudioListProps extends ListProps {
  data: IPriApiResource[];
}

export const SidebarAudioList = ({
  data,
  ...other
}: ISidebarAudioListProps) => {
  const formatTitle = ({ audioTitle: at, title: t }: IPriApiResource) =>
    at || t;
  const linksList =
    data &&
    data.map((item: IPriApiResource) =>
      item.usage && item.usage.story ? item.usage.story[0] : item
    );

  return (
    linksList && (
      <SidebarList data={linksList} formatTitle={formatTitle} {...other} />
    )
  );
};
