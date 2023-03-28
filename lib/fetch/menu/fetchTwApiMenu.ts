import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import fetchTwApi from '@lib/fetch/api/fetchTwApi';

type TwApiMenuItem = {
  ID: number;
  menu_item_parent: string;
  title: string;
  url: string;
};

type MenuItem = {
  id: string;
  parent: string;
  name: string;
  url: string;
  attributes?: { [key: string]: any };
  children?: MenuItem[] | null;
};

function getChildren(parentId: string, allItems: MenuItem[]) {
  let children = allItems.filter(({ parent }) => parent === parentId);

  if (!children.length) return null;

  children = children.map(
    ({ id, ...rest }) =>
      ({
        ...rest,
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
  fetchTwApi(
    `menus/v1/locations/${location}`,
    {
      fields: 'title,url',
      ...params
    },
    init
  ).then(
    (resp) =>
      resp &&
      (resp.data as TwApiMenuItem[])
        .map(({ ID: id, title, url, menu_item_parent: parent }) => {
          const [name, attributesJson] = title.split('|');
          let attributes: { [key: string]: string } | undefined;

          try {
            attributes = JSON.parse(attributesJson);
          } catch (e) {
            // Don't worry about bad attributes data.
          }

          return {
            id: `${id}`,
            parent,
            name,
            url,
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
