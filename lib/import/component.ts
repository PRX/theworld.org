import { ResourceComponentMap } from '@components/pages/ResourceComponentMap';

/**
 * Provide component sutable for use in render functions.
 *
 * @param type
 *    Data or resource type.
 */
export const importComponent = (type: string) => ResourceComponentMap[type];

/**
 * Provide loaded component whose extended properties and methods can be accessed.
 * @param type
 *    Data or resource type.
 */
export const preloadComponent = async (type: string) => {
  const ResourceComponent =
    ResourceComponentMap[type] &&
    (await ResourceComponentMap[type].render
      .preload()
      .then(({ default: Component }) => Component));

  return ResourceComponent;
};
