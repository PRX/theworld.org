/**
import { PriApiResource } from 'pri-api-library/types';
 * @file parseMenu.ts
 * Helper functions to parse menu API data into button objects.
 */

import { parse } from 'url';
import { IButton, ILink } from '@interfaces';

const parseMenu = (data: ILink[]): IButton[] => {

  // If no data or links exist, return empty array.
  if (!data || !data.length) {
    return [];
  }
  return data.map(
    ({
      id,
      name,
      url,
      attributes: { class: className },
      children
    }) => ({
      key: id,
      name,
      url: parse(url),
      itemLinkClass: className && className.join(' '),
      color:
        className &&
        className.reduce(
          (color, cn) => color || (cn === 'btn-danger' && 'secondary'),
          null
        ),
      icon:
        className &&
        className.reduce(
          (icon, cn) => icon || (cn.indexOf('icon-') > -1 && cn.split('-')[1]),
          null
        ),
      children:
        children &&
        parseMenu(children.map(({id, attributes}): ILink => ({ id, ...attributes} as ILink)))
    })
  );
}

export default parseMenu;