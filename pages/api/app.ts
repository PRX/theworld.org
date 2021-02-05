/**
 * @file app.ts
 * Gather app data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiQuery, fetchPriApiQueryMenu } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';
import { parseMenu } from '@lib/parse/menu';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [
    drawerMainNav,
    drawerSocialNav,
    drawerTopNav,
    footerNav,
    headerNav,
    latestStories
  ] = await Promise.all([
    fetchPriApiQueryMenu('menu-drawer-main-nav'),
    fetchPriApiQueryMenu('menu-drawer-social-nav'),
    fetchPriApiQueryMenu('menu-drawer-top-nav'),
    fetchPriApiQueryMenu('menu-footer'),
    fetchPriApiQueryMenu('menu-header-nav'),
    fetchPriApiQuery('node--stories', {
      ...basicStoryParams,
      'filter[status]': 1,
      sort: '-date_published',
      range: 10
    })
  ]);
  const apiResp = {
    latestStories,
    menus: {
      drawerMainNav: parseMenu(drawerMainNav),
      drawerSocialNav: parseMenu(drawerSocialNav),
      drawerTopNav: parseMenu(drawerTopNav),
      footerNav: parseMenu(footerNav),
      headerNav: parseMenu(headerNav)
    }
  };

  res.status(200).json(apiResp);
};
