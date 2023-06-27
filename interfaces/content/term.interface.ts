/**
 * Define term data interfaces and types.
 */

export interface ITerm {
  id: number;
  type: string;
  link: string;
  title: string;
  body: string;
  metatags: { [k: string]: any };
  metatagsHtml?: string;
}
