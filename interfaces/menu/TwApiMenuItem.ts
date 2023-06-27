/**
 * @file TwApiMenuItem.ts
 * Describes menu item object from The World Wordpress API.
 */

export type TwApiMenuItem = {
  ID: number;
  menu_item_parent: string;
  title: string;
  url: string;
};

export default TwApiMenuItem;
