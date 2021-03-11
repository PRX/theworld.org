/**
 * @file parseMenu.ts
 * Helper functions to parse menu API data into button objects.
 */

import { parse } from 'url';
import { IButton, ILink } from '@interfaces';

export const parseMenu = (data: ILink[]): IButton[] => {
  // If no data or links exist, return empty array.
  if (!data || !data.length) {
    return [];
  }
  return data.map(
    ({
      id,
      name,
      url,
      attributes: { class: className, title, ...otherAttributes },
      children
    }) => ({
      key: id,
      name,
      title,
      url: parse(url),
      itemLinkClass: (className && className.join(' ')) || undefined,
      color:
        className &&
        className.reduce(
          (color: string, cn: string) =>
            color || (cn === 'btn-danger' && 'secondary'),
          undefined
        ),
      icon:
        className &&
        className.reduce(
          (icon, cn) => icon || (cn.indexOf('icon-') > -1 && cn.split('-')[1]),
          undefined
        ),
      children:
        children &&
        parseMenu(
          children.map(
            ({ id: childId, attributes }): ILink =>
              ({ id: childId, ...attributes } as ILink)
          )
        ),
      attrinbutes: otherAttributes
    })
  );
};
