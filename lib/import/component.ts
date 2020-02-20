import ResourceComponentMap from '@components/ResourceComponentMap';

/**
 * Provide component sutable for use in render functions.
 *
 * @param type
 *    Data or resource type.
 */
const importComponent = (type: string) => ResourceComponentMap[type] || null;

/**
 * Provide loaded component whose extended properties and methods can be accessed.
 * @param type
 *    Data or resource type.
 */
const preloadComonent = async (type: string) =>
  ResourceComponentMap[type] &&
  (await ResourceComponentMap[type].render.preload()).default;

export { importComponent, preloadComonent };
