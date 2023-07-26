/**
 * Define homepage data interfaces and types.
 */

import { Program } from '@interfaces/api';
import { IButton } from '@interfaces/button';
import { IProgram } from './program.interface';
import { IStory, PostStory } from './story.interface';

export interface IHomepage extends IProgram {
  latestStories: IStory[];
  menus: { [k: string]: IButton[] };
}

export type Homepage = Program & {
  latestStories: PostStory[];
  menus: { [k: string]: IButton[] };
};
