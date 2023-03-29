/**
 * @file parseMenu.ts
 * Helper functions to parse menu API data into button objects.
 */

import { IButton } from '@interfaces';
import { MenuItem } from '@interfaces/menu';
import { isLocalUrl } from '../url';

export const parseMenu = (data: MenuItem[]) => {
  // If no data or links exist, return empty array.
  if (!data || !data.length) {
    return [];
  }
  return data.map(({ id, name, url, attributes, children = null }) => {
    const {
      class: className,
      color,
      icon,
      title,
      referrerpolicy,
      ...otherAttributes
    } = attributes || {};
    const isLocal = isLocalUrl(url);

    return {
      key: id,
      name,
      url,
      ...(color && { color }),
      ...(icon && { icon }),
      ...(title && { title }),
      ...(className && {
        itemLinkClass: className.join(' ')
      }),
      children: children && parseMenu(children),
      attributes: {
        ...otherAttributes,
        ...(!isLocal && {
          referrerPolicy: 'no-referrer-when-downgrade'
        })
      }
    } satisfies IButton;
  });
};
