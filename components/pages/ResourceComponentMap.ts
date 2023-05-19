import dynamic from 'next/dynamic';

// Define dynamic component imports.
const DynamicAudio = dynamic(() => import('./Audio') as any);
const DynamicBio = dynamic(() => import('./Bio') as any);
const DynamicCategory = dynamic(() => import('./Category') as any);
const DynamicEpisode = dynamic(() => import('./Episode') as any);
const DynamicHomepage = dynamic(() => import('./Homepage') as any);
const DynamicImage = dynamic(() => import('./Image') as any);
const DynamicNewsletter = dynamic(() => import('./Newsletter') as any);
const DynamicPage = dynamic(() => import('./Page') as any);
const DynamicProgram = dynamic(() => import('./Program') as any);
const DynamicStory = dynamic(() => import('./Story') as any);
const DynamicTeam = dynamic(() => import('./Team') as any);
const DynamicTerm = dynamic(() => import('./Term') as any);

// Map dyanmic component to a data/resource type.
export const ResourceComponentMap = {
  'file--audio': DynamicAudio,
  'file--images': DynamicImage,
  homepage: DynamicHomepage,
  'node--episodes': DynamicEpisode,
  'node--newsletter_sign_ups': DynamicNewsletter,
  'node--pages': DynamicPage,
  'node--people': DynamicBio,
  'node--programs': DynamicProgram,
  'post--story': DynamicStory,
  'taxonomy_term--categories': DynamicCategory,
  'taxonomy_term--terms': DynamicTerm,
  team: DynamicTeam
};
