import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { URL } from 'url';
import { fetchTwApi } from '@lib/fetch/api';
import { MenuItem, MenuItemAttributes, TwApiMenuItem } from '@interfaces/menu';

const servicesMap = new Map<string, string>();
servicesMap.set('give.prx.org', 'prx:give');
servicesMap.set('facebook.com', 'facebook');
servicesMap.set('www.facebook.com', 'facebook');
servicesMap.set('instagram.com', 'instagram');
servicesMap.set('www.instagram.com', 'instagram');
servicesMap.set('twitter.com', 'twitter');
servicesMap.set('www.twitter.com', 'twitter');

function getServiceFromUrl(url: string) {
  try {
    const { hostname } = new URL(url, 'https://theworld.org');
    const service = servicesMap.get(hostname);

    return service;
  } catch (e) {
    return undefined;
  }
}

function getChildren(parentId: string, allItems: MenuItem[]) {
  let children = allItems.filter(({ parent }) => parent === parentId);

  if (!children.length) return null;

  children = children.map(
    ({ id, ...rest }) =>
      ({
        ...rest,
        id,
        children: getChildren(id, allItems)
      } as MenuItem)
  );

  return children;
}

/**
 * Method that simplifies GET queries for menu data.
 *
 * @param location
 *    Name of menu location.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 * @param init
 *    Optional. Fetch request init options.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchTwApiMenu = async (
  location: string,
  params?: object,
  init?: RequestInit
) =>
  fetchTwApi<TwApiMenuItem[]>(
    `menus/v1/locations/${location}`,
    {
      fields: 'title,url',
      ...params
    },
    init
  ).then(
    (resp) =>
      resp &&
      resp.data
        .map(({ ID, title, url, menu_item_parent: parent }) => {
          const [name, attributesJson] = title.split('|');
          const service = getServiceFromUrl(url);
          let attributes: MenuItemAttributes | undefined;

          try {
            attributes = JSON.parse(attributesJson);
          } catch (e) {
            // Don't worry about bad attributes data.
          }

          return {
            id: `${ID}`,
            parent,
            name,
            url,
            ...(service && { service }),
            ...(attributes && { attributes })
          } as MenuItem;
        })
        .map(
          ({ id, ...rest }, _index, menu) =>
            ({
              ...rest,
              id,
              children: getChildren(id, menu)
            } as MenuItem)
        )
        .filter(({ parent }) => parent === '0')
  );

export default fetchTwApiMenu;
