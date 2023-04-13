/**
 * Defines story data interface and types.
 */

import { IImage } from './image.interface';

export interface IStory {
  id: number;
  type: string;
  link: string;
  datePublished: string;
  dateBroadcast?: string;
  title: string;
  body: string;
  subhead: string;
  image?: IImage;
}
