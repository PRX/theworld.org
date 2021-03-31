import dynamic from 'next/dynamic';

const DynamicStoryDefault = dynamic(() => import('./default') as any);
const DynamicStoryFeature = dynamic(() => import('./feature') as any);

const layoutComponentMap = {
  full: DynamicStoryFeature,
  feature_full: DynamicStoryFeature,
  standard: DynamicStoryDefault
};

export { layoutComponentMap };
