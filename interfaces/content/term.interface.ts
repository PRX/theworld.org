/**
 * Define term data interfaces and types.
 */

import type {
  City,
  Continent,
  Country,
  Person,
  ProvinceOrState,
  Region,
  SocialTag,
  Tag
} from '@interfaces';

export interface ITerm {
  id: number;
  type: string;
  link: string;
  title: string;
  body: string;
  metatags: { [k: string]: any };
  metatagsHtml?: string;
}

export type PostTag =
  | Tag
  | City
  | Continent
  | Country
  | Person
  | ProvinceOrState
  | Region
  | SocialTag;
