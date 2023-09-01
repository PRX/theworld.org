/**
 * @file fetchEpisodeData.ts
 *
 * Actions to fetch data for a episode resource.
 */

import { fetchGqlEpisode } from '@lib/fetch';

export const fetchEpisodeData = async (id: string, idType?: string) => {
  const dataPromise = fetchGqlEpisode(id, idType);

  // const ctaDataPromise = dispatch<any>(
  //   fetchCtaRegionGroupData('tw_cta_regions_content')
  // );

  const episode = await dataPromise;
  // await ctaDataPromise;

  if (episode) {
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

  return episode;
};
