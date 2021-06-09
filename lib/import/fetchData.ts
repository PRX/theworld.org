import { ResourceFetchDataMap } from '@components/pages/ResourceFetchDataMap';

export const getResourceFetchData = (type: string) =>
  ResourceFetchDataMap.get(type);
