import dynamic from 'next/dynamic';

const DynamicStoryDefault = dynamic(() => import('./default') as any);
const DynamicStoryFeature = dynamic(() => import('./feature') as any);

const layoutComponentMap = new Map();
layoutComponentMap.set('full', DynamicStoryFeature);
layoutComponentMap.set('feature_full', DynamicStoryFeature);
layoutComponentMap.set('standard', DynamicStoryDefault);

export { layoutComponentMap };
