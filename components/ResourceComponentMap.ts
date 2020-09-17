import dynamic from 'next/dynamic';

// Define dynamic component imports.
const DynamicHomepage = dynamic(() => import('./Homepage') as any);
const DynamicNewsletter = dynamic(() => import('./Newsletter') as any);
const DynamicStory = dynamic(() => import('./Story') as any);

// Map dyanmic component to a data/resource type.
export const ResourceComponentMap = {
  homepage: DynamicHomepage,
  'node--newsletter_sign_ups': DynamicNewsletter,
  'node--stories': DynamicStory
};
