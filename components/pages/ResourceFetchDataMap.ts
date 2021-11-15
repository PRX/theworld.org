import { fetchStoryData } from '@store/actions/fetchStoryData';
import { fetchData as audioFetchData } from './Audio';
import { fetchData as bioFetchData } from './Bio';
import { fetchData as categoryFetchData } from './Category';
import { fetchData as episodeFetchData } from './Episode';
import { fetchData as newsletterFetchData } from './Newsletter';
import { fetchData as pageFetchData } from './Page';
import { fetchData as programFetchData } from './Program';
import { fetchData as teamFetchData } from './Team';
import { fetchData as termFetchData } from './Term';

export const ResourceFetchDataMap = new Map();

ResourceFetchDataMap.set('file--audio', audioFetchData);
ResourceFetchDataMap.set('node--episodes', episodeFetchData);
ResourceFetchDataMap.set('node--newsletter_sign_ups', newsletterFetchData);
ResourceFetchDataMap.set('node--pages', pageFetchData);
ResourceFetchDataMap.set('node--people', bioFetchData);
ResourceFetchDataMap.set('node--programs', programFetchData);
ResourceFetchDataMap.set('node--stories', fetchStoryData);
ResourceFetchDataMap.set('taxonomy_term--categories', categoryFetchData);
ResourceFetchDataMap.set('taxonomy_term--terms', termFetchData);
ResourceFetchDataMap.set('team', teamFetchData);
