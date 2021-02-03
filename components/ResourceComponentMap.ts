import dynamic from 'next/dynamic';

// Define dynamic component imports.
const DynamicBio = dynamic(() => import('./Bio') as any);
const DynamicCategory = dynamic(() => import('./Category') as any);
const DynamicHomepage = dynamic(() => import('./Homepage') as any);
const DynamicNewsletter = dynamic(() => import('./Newsletter') as any);
const DynamicProgram = dynamic(() => import('./Program') as any);
const DynamicStory = dynamic(() => import('./Story') as any);
const DynamicTerm = dynamic(() => import('./Term') as any);

// Map dyanmic component to a data/resource type.
export const ResourceComponentMap = {
  homepage: DynamicHomepage,
  'node--newsletter_sign_ups': DynamicNewsletter,
  'node--people': DynamicBio,
  'node--programs': DynamicProgram,
  'node--stories': DynamicStory,
  'taxonomy_term--categories': DynamicCategory,
  'taxonomy_term--terms': DynamicTerm
};
