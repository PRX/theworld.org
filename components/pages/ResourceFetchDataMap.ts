import { fetchAudioData } from '@store/actions/fetchAudioData';
import { fetchCategoryData } from '@store/actions/fetchCategoryData';
import { fetchEpisodeData } from '@store/actions/fetchEpisodeData';
import { fetchImageData } from '@store/actions/fetchImageData';
import { fetchNewsletterData } from '@store/actions/fetchNewsletterData';
import { fetchPageData } from '@store/actions/fetchPageData';
import { fetchPersonData } from '@store/actions/fetchPersonData';
import { fetchProgramData } from '@store/actions/fetchProgramData';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { fetchTeamData } from '@store/actions/fetchTeamData';
import { fetchTermData } from '@store/actions/fetchTermData';
import { fetchVideoData } from '@store/actions/fetchVideoData';

export const ResourceFetchDataMap = new Map();

ResourceFetchDataMap.set('file--audio', fetchAudioData);
ResourceFetchDataMap.set('file--images', fetchImageData);
ResourceFetchDataMap.set('file--videos', fetchVideoData);
ResourceFetchDataMap.set('post--episode', fetchEpisodeData);
ResourceFetchDataMap.set('node--newsletter_sign_ups', fetchNewsletterData);
ResourceFetchDataMap.set('node--pages', fetchPageData);
ResourceFetchDataMap.set('node--people', fetchPersonData);
ResourceFetchDataMap.set('node--programs', fetchProgramData);
ResourceFetchDataMap.set('post--story', fetchStoryData);
ResourceFetchDataMap.set('taxonomy_term--categories', fetchCategoryData);
ResourceFetchDataMap.set('taxonomy_term--terms', fetchTermData);
ResourceFetchDataMap.set('team', fetchTeamData);
