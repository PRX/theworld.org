import type { IButton, PostStory } from '@interfaces';

export interface IApp {
  latestStories?: PostStory[];
  menus: {
    [k: string]: IButton[];
  };
}
