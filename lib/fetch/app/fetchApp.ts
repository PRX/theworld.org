/**
 * Fetch App data from CMS API.
 */

import { IButton } from '@interfaces';
import { parseMenu } from '@lib/parse/menu';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { fetchPriApiQuery, fetchPriApiQueryMenu } from '../api/fetchPriApi';
import { basicStoryParams } from '../api/params';

export interface IApp {
  latestStories: IPriApiCollectionResponse;
  menus: {
    [k: string]: IButton[];
  };
}

export const fetchApp = async (): Promise<IApp> => {
  const [
    drawerMainNav,
    drawerSocialNav,
    drawerTopNav,
    footerNav,
    headerNav,
    quickLinks,
    latestStories
  ] = await Promise.all([
    fetchPriApiQueryMenu('menu-tw-main-nav'),
    fetchPriApiQueryMenu('menu-tw-social-nav'),
    fetchPriApiQueryMenu('menu-tw-top-nav'),
    fetchPriApiQueryMenu('menu-tw-footer-nav'),
    fetchPriApiQueryMenu('menu-tw-header-nav'),
    fetchPriApiQueryMenu('menu-the-world-quick-links'),
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
      drawerMainNav: parseMenu(drawerMainNav),
      drawerSocialNav: parseMenu(drawerSocialNav),
      drawerTopNav: parseMenu(drawerTopNav),
      footerNav: parseMenu(footerNav),
      headerNav: parseMenu(headerNav),
      quickLinks: parseMenu(quickLinks)
    }
  };

  return resp;
};
