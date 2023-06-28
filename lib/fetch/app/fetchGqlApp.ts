/**
 * Fetch Story data from WP GraphQL API.
 */

import type { Maybe, Menu, Program } from '@interfaces';
import { gql } from '@apollo/client';
import { gqlClient } from '@lib/fetch/api';
import { parseMenu } from '@lib/parse/menu';
import { STORY_CARD_PROPS } from '../story';

const MENU_ITEM_PROPS = gql`
  fragment MenuItemProps on MenuItem {
    id
    parentId
    label
    url
  }
`;

const MENU_PROPS = gql`
  fragment MenuProps on Menu {
    menuItems {
      nodes {
        ...MenuItemProps
      }
    }
  }
  ${MENU_ITEM_PROPS}
`;

const GET_APP = gql`
  query getApp {
    program(id: "the-world", idType: SLUG) {
      posts(first: 10) {
        nodes {
          ...StoryCardProps
        }
      }
    }
    headerMenu: menu(id: "header-nav", idType: SLUG) {
      ...MenuProps
    }
    footerMenu: menu(id: "footer-nav", idType: SLUG) {
      ...MenuProps
    }
    mainMenu: menu(id: "main-nav", idType: SLUG) {
      ...MenuProps
    }
    socialMenu: menu(id: "social-nav", idType: SLUG) {
      ...MenuProps
    }
    topMenu: menu(id: "top-nav", idType: SLUG) {
      ...MenuProps
    }
  }
  ${STORY_CARD_PROPS}
  ${MENU_PROPS}
`;

export const fetchGqlApp = async () => {
  const response = await gqlClient.query<{
    program: Maybe<Program>;
    headerMenu: Maybe<Menu>;
    footerMenu: Maybe<Menu>;
    mainMenu: Maybe<Menu>;
    socialMenu: Maybe<Menu>;
    topMenu: Maybe<Menu>;
  }>({
    query: GET_APP
  });
  const data = response?.data;

  if (!data) return undefined;

  const latestStories = data.program?.posts?.nodes;
  const drawerMainNav = data.mainMenu?.menuItems?.nodes;
  const drawerSocialNav = data.socialMenu?.menuItems?.nodes;
  const drawerTopNav = data.topMenu?.menuItems?.nodes;
  const footerNav = data.footerMenu?.menuItems?.nodes;
  const headerNav = data.headerMenu?.menuItems?.nodes;

  return {
    ...(latestStories && { latestStories }),
    menus: {
      ...(drawerMainNav && { drawerMainNav: parseMenu(drawerMainNav) }),
      ...(drawerSocialNav && { drawerSocialNav: parseMenu(drawerSocialNav) }),
      ...(drawerTopNav && { drawerTopNav: parseMenu(drawerTopNav) }),
      ...(footerNav && { footerNav: parseMenu(footerNav) }),
      ...(headerNav && { headerNav: parseMenu(headerNav) })
    }
  };
};

export default fetchGqlApp;
