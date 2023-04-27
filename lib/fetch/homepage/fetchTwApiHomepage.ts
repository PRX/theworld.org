import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { IHomepage } from '@interfaces';
import fetchTwApi from '@lib/fetch/api/fetchTwApi';
import { parseTwApiDataTermProgram } from '@lib/parse/data';

export const HOMEPAGE_PROGRAM_ID = 2;

export const fetchTwApiHomepage = async (init?: RequestInit) => {
  const programResp = await fetchTwApi(
    `program/${HOMEPAGE_PROGRAM_ID}`,
    undefined,
    init
  );
  const { data: programData } = programResp;
  const program = programData && parseTwApiDataTermProgram(programData);

  // Get latest stories.
  const latestStoriesResp = fetchTwApi(
    'posts',
    { program_exclude: HOMEPAGE_PROGRAM_ID },
    init
  );

  const data = {
    ...program
  } as IHomepage;

  return { data };
};
