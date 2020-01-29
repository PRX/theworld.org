import dynamic from 'next/dynamic';

const DynamicHomepage = dynamic(() => import('@components/Homepage'));
const DynamicStory = dynamic(() => import('@components/Story'));

const ResourceComponentMap = {
  homepage: DynamicHomepage,
  'node--stories': DynamicStory
};

const importComponent = (type: string) => ResourceComponentMap[type] || null;

const preloadComonent = async (type: string) =>
  ResourceComponentMap[type] &&
  (await ResourceComponentMap[type].render.preload()).default;

export { importComponent, preloadComonent };
