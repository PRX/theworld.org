/**
 * Define homepage data interfaces and types.
 */

import { IButton } from '@interfaces/button';
import { IProgram } from './program.interface';
import { IStory } from './story.interface';

export interface IHomepage extends IProgram {
  latestStories: IStory[];
  menus: { [k: string]: IButton[] };
}
