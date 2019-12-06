import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const DynamicHomepage = dynamic(() => import('@components/Homepage'));
const DynamicStory = dynamic(() => import('@components/Story'));

const ResourceComponentMap = {
  'homepage': DynamicHomepage,
  'node--stories': DynamicStory
};

const importResourceComponent = (type: string):ComponentType => ResourceComponentMap[type] || null;

export default importResourceComponent;
