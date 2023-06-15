/**
 * Fetch Story data from WP API.
 */

import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { IStory, TwApiResource } from '@interfaces';
import { fetchTwApi } from '@lib/fetch/api';
import { fullTwApiStoryParams } from '@lib/fetch/api/params';
import {
  type TwApiDataPostStory,
  type TwApiTerm,
  parseTwApiDataPostStory,
  parseTwApiDataTerm
} from '@lib/parse/data';

export const fetchTwApiStory = async (id: number, init?: RequestInit) =>
  fetchTwApi<TwApiDataPostStory>(
    `wp/v2/posts/${id}`,
    {
      ...fullTwApiStoryParams
    },
    init
  )
    .then((resp) => resp && parseTwApiDataPostStory(resp.data))
    .then(async (story) => {
      if (!story) return story;

      const {
        categories: categoriesIds,
        contributor: contributorIds,
        program: programIds,
        tags: tagsIds,
        city: cityIds,
        provinceOrState: provinceOrStateIds,
        country: countryIds,
        continent: continentIds,
        region: regionIds,
        person: personIds,
        socialTags: socialTagsIds,
        resourceDevelopment: resourceDevelopmentIds,
        storyFormat: storyFormatIds,
        ...rest
      } = story;

      // Construct Term Data Requests.
      const getTermsRequest = (path: string, ids: number[]) =>
        ids.length
          ? fetchTwApi<TwApiTerm[]>(
              path,
              {
                include: ids,
                _fields: ['id', 'taxonomy', 'link', 'name']
              },
              init
            )
          : undefined;
      const categoriesRequest = getTermsRequest(
        'wp/v2/categories',
        categoriesIds as number[]
      );
      const contributorRequest = getTermsRequest(
        'wp/v2/contributor',
        contributorIds as number[]
      );
      const programRequest = getTermsRequest(
        'wp/v2/program',
        programIds as number[]
      );
      const tagsRequest = getTermsRequest('wp/v2/tags', tagsIds as number[]);
      const cityRequest = getTermsRequest('wp/v2/city', cityIds as number[]);
      const provinceOrStateRequest = getTermsRequest(
        'wp/v2/province_or_state',
        provinceOrStateIds as number[]
      );
      const countryRequest = getTermsRequest(
        'wp/v2/country',
        countryIds as number[]
      );
      const continentRequest = getTermsRequest(
        'wp/v2/continent',
        continentIds as number[]
      );
      const regionRequest = getTermsRequest(
        'wp/v2/region',
        regionIds as number[]
      );
      const personRequest = getTermsRequest(
        'wp/v2/person',
        personIds as number[]
      );
      const socialTagsRequest = getTermsRequest(
        'wp/v2/social_tags',
        socialTagsIds as number[]
      );
      const resourceDevelopmentRequest = getTermsRequest(
        'wp/v2/resource_development',
        resourceDevelopmentIds as number[]
      );
      const storyFormatRequest = getTermsRequest(
        'wp/v2/story_format',
        storyFormatIds as number[]
      );

      // Await Term Data Requests.
      const [
        categories,
        contributor,
        program,
        tags,
        city,
        provinceOrState,
        country,
        continent,
        region,
        person,
        socialTags,
        resourceDevelopment,
        storyFormat
      ] = await Promise.all([
        categoriesRequest,
        contributorRequest,
        programRequest,
        tagsRequest,
        cityRequest,
        provinceOrStateRequest,
        countryRequest,
        continentRequest,
        regionRequest,
        personRequest,
        socialTagsRequest,
        resourceDevelopmentRequest,
        storyFormatRequest
      ]).then((collections) =>
        collections.map((terms) =>
          terms?.data.map((term) => parseTwApiDataTerm(term))
        )
      );

      // Construct Result.
      const data = {
        ...rest,
        ...(categories && { categories }),
        ...(contributor && { contributor }),
        ...(program && { program }),
        ...(tags && { tags }),
        ...(city && { city }),
        ...(provinceOrState && { provinceOrState }),
        ...(country && { country }),
        ...(continent && { continent }),
        ...(region && { region }),
        ...(person && { person }),
        ...(socialTags && { socialTags }),
        ...(resourceDevelopment && { resourceDevelopment }),
        ...(storyFormat && { storyFormat })
      } as IStory;

      return { data } as TwApiResource<IStory>;
    });

export default fetchTwApiStory;
