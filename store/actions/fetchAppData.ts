/**
 * @file fetchAppData.ts
 *
 * Actions to fetch data for app.
 */
import { fetchGqlApp } from '@lib/fetch';
// import { fetchCtaRegionGroupData } from './fetchCtaRegionGroupData';

export const fetchAppData = async () => {
  const appData = await fetchGqlApp();

  if (appData) {
    // const ctaDataPromise = dispatch<any>(
    //   fetchCtaRegionGroupData('tw_cta_regions_site')
    // );

    return appData;
  }

  return undefined;
};
