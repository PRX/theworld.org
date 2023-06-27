/**
 * Define post data interfaces and types.
 */

import type { ICategory } from './category.interface';
import type { IContent } from './content.interface';
import type { IImage } from './image.interface';
import type { ITerm } from './term.interface';

export interface IPost extends IContent {
  datePublished: string;
  title: string;
  subhead: string;
  body: string;
  image?: number | IImage;
  categories?: number[] | ICategory[];
  tags?: number[] | ITerm[];
  metatags: { [k: string]: any };
  metatagsHtml?: string;
}
