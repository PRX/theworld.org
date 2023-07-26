import { gql } from '@apollo/client';

export const MENU_ITEM_PROPS = gql`
  fragment MenuItemProps on MenuItem {
    id
    parentId
    label
    url
  }
`;

export const MENU_PROPS = gql`
  fragment MenuProps on Menu {
    menuItems {
      nodes {
        ...MenuItemProps
      }
    }
  }
  ${MENU_ITEM_PROPS}
`;
