import dynamic from 'next/dynamic';

const DynamicDefault = dynamic(() => import('./default/Story.default'));

const layoutComponentMap = {
  standard: DynamicDefault
}

export { layoutComponentMap };