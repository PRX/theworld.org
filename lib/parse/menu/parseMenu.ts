/**
 * @file parseMenu.ts
 * Helper functions to parse menu API data into button objects.
 */

import { IButton, MenuItem } from '@interfaces';
import { isLocalUrl } from '../url';

export const parseMenu = (data: MenuItem[]): IButton[] => {
  // If no data or links exist, return empty array.
  if (!data || !data.length) {
    return [];
  }

  const menu = data
    .filter((v) => !!v.url)
    .map<IButton>(({ id, label, url, childItems }) => {
      const isLocal = isLocalUrl(url || '/');

      return {
        key: id,
        name: label,
        url,
        children: childItems?.nodes && parseMenu(childItems.nodes),
        attributes: {
          ...(!isLocal && {
            referrerPolicy: 'no-referrer-when-downgrade'
          })
        }
      } as IButton;
    });

  return menu;
};
