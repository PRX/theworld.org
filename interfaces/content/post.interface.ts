/**
 * Define post data interfaces and types.
 */

export interface IPost {
  id: number;
  type: string;
  link: string;
  datePublished: string;
  title: string;
  subhead: string;
  body: string;
  image?: number;
  categories?: number[];
  tags?: number[];
  metatags: { [k: string]: any };
  metatagsHtml?: string;
}
