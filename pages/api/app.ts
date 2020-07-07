/**
 * @file app.ts
 * Gather app data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiQuery, fetchPriApiQueryMenu } from '@lib/fetch/api';
import { parseMenu } from '@lib/parse/menu';
import { ILink } from '@interfaces/link';

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
      'filter[status]': 1,
      sort: '-date_published',
      range: 10
    })
  ]);
  const apiResp = {
    latestStories,
    menus: {
      drawerMainNav: parseMenu(drawerMainNav as ILink[]),
      drawerSocialNav: parseMenu(drawerSocialNav as ILink[]),
      drawerTopNav: parseMenu(drawerTopNav as ILink[]),
      footerNav: parseMenu(footerNav as ILink[]),
      headerNav: parseMenu(headerNav as ILink[])
    }
  };

  res.status(200).json(apiResp);
};
