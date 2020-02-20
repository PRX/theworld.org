import dynamic from 'next/dynamic';

// Define dynamic component imports.
const DynamicHomepage = dynamic(() => import('./Homepage'));
const DynamicStory = dynamic(() => import('./Story'));

// Map dyanmic component to a data/resource type.
export default {
  homepage: DynamicHomepage,
  'node--stories': DynamicStory
};
