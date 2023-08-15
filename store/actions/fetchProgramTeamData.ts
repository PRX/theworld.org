/**
 * @file fetchProgramTeamData.ts
 *
 * Actions to fetch data for program team page.
 */

import { fetchGqlProgramTeam } from '@lib/fetch';

export const fetchProgramTeamData = async (id: string, idType?: string) => {
  const program = fetchGqlProgramTeam(id, idType);

  // Do any additional fetching logic here...

  return program;
};
