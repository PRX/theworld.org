import { fetchAudioData } from '@store/actions/fetchAudioData';
import { fetchCategoryData } from '@store/actions/fetchCategoryData';
import { fetchEpisodeData } from '@store/actions/fetchEpisodeData';
import { fetchNewsletterData } from '@store/actions/fetchNewsletterData';
import { fetchPageData } from '@store/actions/fetchPageData';
import { fetchProgramData } from '@store/actions/fetchProgramData';
import { fetchSegmentData } from '@store/actions/fetchSegmentData';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { fetchTagData } from '@store/actions/fetchTagData';

export const ResourceFetchDataMap = new Map();

ResourceFetchDataMap.set('file--audio', fetchAudioData);
ResourceFetchDataMap.set('post--episode', fetchEpisodeData);
ResourceFetchDataMap.set('post--newsletter', fetchNewsletterData);
ResourceFetchDataMap.set('post--page', fetchPageData);
ResourceFetchDataMap.set('term--program', fetchProgramData);
ResourceFetchDataMap.set('post--segment', fetchSegmentData);
ResourceFetchDataMap.set('post--story', fetchStoryData);
ResourceFetchDataMap.set('term--categories', fetchCategoryData);
ResourceFetchDataMap.set('term--tag', fetchTagData);
