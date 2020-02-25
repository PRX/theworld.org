import { ResourceComponentMap } from '@components/ResourceComponentMap';

/**
 * Provide component sutable for use in render functions.
 *
 * @param type
 *    Data or resource type.
 */
export const importComponent = (type: string) =>
  ResourceComponentMap[type] || null;

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
      .then(({ default: Component }) => {
        return Component;
      }));

  return ResourceComponent;
};
