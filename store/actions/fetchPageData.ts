/**
 * @file fetchGqlPage.ts
 *
 * Fetch data for a page resource.
 */

import { fetchGqlPage } from '@lib/fetch';

export const fetchPageData = async (id: string) => {
  const dataPromise = fetchGqlPage(id);

  // const ctaDataPromise = dispatch<any>(
  //   fetchCtaRegionGroupData('tw_cta_regions_content')
  // );

  const page = await dataPromise;
  // await ctaDataPromise;

  if (page) {
    // Set CTA filter props.
    // dispatch({
    //   type: 'SET_RESOURCE_CTA_FILTER_PROPS',
    //   payload: {
    //     filterProps: {
    //       type,
    //       id,
    //       props: {
    //         id,
    //         categories: [
    //           ...(story.categories?.nodes || []).map(({ id: tid }) => tid)
    //         ].filter((v: any) => !!v),
    //         program: story.programs?.nodes[0].id || null
    //       }
    //     }
    //   } as ICtaFilterProps
    // });
  }

  return page;
};
