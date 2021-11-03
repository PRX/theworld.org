/**
 * @file SidebarAudioList.tsx
 * Component for audio list in sidebar items.
 */

import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { IPriApiResource } from 'pri-api-library/types';
import { ListProps } from '@material-ui/core';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { SidebarList } from '../SidebarList';

interface ISidebarAudioListProps extends ListProps {
  data: IPriApiResource[];
}

export const SidebarAudioList = ({
  data,
  ...other
}: ISidebarAudioListProps) => {
  const { dispatch } = useStore();
  const formatTitle = ({ audioTitle: at, title: t }: IPriApiResource) =>
    at || t;
  const linksList =
    data &&
    data.map((item: IPriApiResource) =>
      item.usage && item.usage.story ? item.usage.story[0] : item
    );

  useEffect(() => {
    linksList.forEach((item: IPriApiResource) => {
      const { type, id } = item;

      switch (type) {
        case 'node--stories':
          dispatch<any>(fetchStoryData(id as string));
          break;
        default:
          dispatch({
            type: 'FETCH_CONTENT_DATA_SUCCESS',
            payload: item
          });
          break;
      }
    });
  }, []);

  return (
    linksList && (
      <SidebarList data={linksList} formatTitle={formatTitle} {...other} />
    )
  );
};
