/**
 * @file fetchAudioData.ts
 *
 * Actions to fetch data for a audio resource.
 */

import { fetchGqlSegment } from '@lib/fetch';

export const fetchSegmentData = async (id: string, idType?: string) => {
  const dataPromise = await fetchGqlSegment(id, idType);

  // const ctaDataPromise = dispatch<any>(
  //   fetchCtaRegionGroupData('tw_cta_regions_content')
  // );

  const segment = await dataPromise;
  // await ctaDataPromise;

  if (segment) {
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

  return segment;
};
