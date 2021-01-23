import dynamic from 'next/dynamic';

// Define dynamic component imports.
const DynamicCategory = dynamic(() => import('./Category') as any);
const DynamicHomepage = dynamic(() => import('./Homepage') as any);
const DynamicNewsletter = dynamic(() => import('./Newsletter') as any);
const DynamicProgram = dynamic(() => import('./Program') as any);
const DynamicStory = dynamic(() => import('./Story') as any);

// Map dyanmic component to a data/resource type.
export const ResourceComponentMap = {
  homepage: DynamicHomepage,
  'node--newsletter_sign_ups': DynamicNewsletter,
  'node--programs': DynamicProgram,
  'node--stories': DynamicStory,
  'taxonomy_term--categories': DynamicCategory
};
