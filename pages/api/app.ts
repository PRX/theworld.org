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
    })
  ]);
  const apiResp = {
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

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate'
  );

  return res.status(200).json(apiResp);
};
