import dynamic from 'next/dynamic';

const DynamicStoryDefault = dynamic(() => import('./default') as any);

const layoutComponentMap = {
  standard: DynamicStoryDefault
};

export { layoutComponentMap };