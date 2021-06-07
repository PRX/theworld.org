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
      attributes: {
        class: className,
        title,
        referrerpolicy,
        ...otherAttributes
      },
      children = null
    }) => ({
      key: id,
      name,
      ...(title && { title }),
      url: { ...parse(url) },
      ...(className && {
        itemLinkClass: className.join(' '),
        color: className.reduce(
          (color: string, cn: string) =>
            color || (cn === 'btn-danger' && 'secondary'),
          null
        ),
        icon: className.reduce(
          (icon: string, cn: string) =>
            icon || (cn.indexOf('icon-') > -1 && cn.split('-')[1]),
          null
        )
      }),
      children:
        children &&
        parseMenu(
          children.map(
            ({ id: childId, attributes }): ILink =>
              ({ id: childId, ...attributes } as ILink)
          )
        ),
      attributes: {
        ...otherAttributes,
        ...(referrerpolicy && { referrerPolicy: referrerpolicy })
      }
    })
  );
};
