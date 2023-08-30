import type { IButton, ICtaMessage, PostStory } from '@interfaces';

export interface IApp {
  latestStories?: PostStory[];
  menus?: {
    [k: string]: IButton[];
  };
  ctaRegions?: {
    [k: string]: ICtaMessage[];
  };
}
