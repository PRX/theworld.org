/**
 * Fetch App data from CMS API.
 */

import type { IApp } from '@interfaces/app';
import { parseMenu } from '@lib/parse/menu';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { fetchPriApiQuery } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';
import { fetchTwApiMenu } from '../menu';

export const fetchApp = async (): Promise<IApp> => {
  const [
    drawerMainNav,
    drawerSocialNav,
    drawerTopNav,
    footerNav,
    headerNav,
    latestStories
  ] = await Promise.all([
    fetchTwApiMenu('secondary-menu'),
    fetchTwApiMenu('social'),
    fetchTwApiMenu('highlight-menu'),
    fetchTwApiMenu('tertiary-menu'),
    fetchTwApiMenu('primary-menu'),
    fetchPriApiQuery('node--stories', {
      ...basicStoryParams,
      'filter[status]': 1,
      sort: '-date_published',
      range: 10
    }).then((resp: IPriApiCollectionResponse) => resp)
  ]);

  const resp = {
    latestStories,
    menus: {
      ...(drawerMainNav && { drawerMainNav: parseMenu(drawerMainNav) }),
      ...(drawerSocialNav && { drawerSocialNav: parseMenu(drawerSocialNav) }),
      ...(drawerTopNav && { drawerTopNav: parseMenu(drawerTopNav) }),
      ...(footerNav && { footerNav: parseMenu(footerNav) }),
      ...(headerNav && { headerNav: parseMenu(headerNav) })
    }
  };

  return resp;
};
