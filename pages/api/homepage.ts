/**
 * @file app.ts
 * Gather homepage data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResource } from 'pri-api-library/types';
import { fetchApiProgram, fetchPriApiQuery } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Program Data
  const {
    data: program,
    data: { featuredStories },
    ctaRegions,
    context
  } = await fetchApiProgram(3704, req);

  // Latest TW Stories
  const latestTwStories = (await fetchPriApiQuery('node--stories', {
    include: ['image', 'primary_category'],
    'filter[status]': 1,
    'filter[program]': 3704,
    sort: '-date_published',
    range: 15 - (featuredStories ? featuredStories.length : 0)
  })) as IPriApiResource[];

  // Latest Non-TW stories
  const latestStories = (await fetchPriApiQuery('node--stories', {
    'filter[status]': 1,
    'filter[program][value]': 3704,
    'filter[program][operator]': '<>',
    sort: '-date_published',
    range: 10
  })) as IPriApiResource[];

  // Latest TW Episode
  const latestTwEpisode = ((await fetchPriApiQuery('node--episodes', {
    include: ['image', 'audio.segments'],
    'filter[status]': 1,
    'filter[program]': 3704,
    sort: '-date_published',
    range: 1
  })) as IPriApiResource[]).shift();

  const apiResp = {
    type: 'homepage',
    ctaRegions,
    context,
    data: {
      featuredStory: featuredStories
        ? featuredStories.shift()
        : latestTwStories.shift(),
      featuredStories: featuredStories
        ? featuredStories.concat(
            latestTwStories.splice(0, 4 - featuredStories.length)
          )
        : latestTwStories.splice(0, 4),
      latestTwStories,
      latestStories,
      latestTwEpisode,
      links: [
        {
          label:
            'These Chilean women joined thousands suing for discriminatory health insurance. Can reforms fix it?',
          href: {
            pathname: '/',
            query: {
              alias:
                '/stories/2019-08-28/thousands-chilean-women-sued-discriminatory-health-insurance-can-reforms-fix-it'
            }
          }
        },
        {
          label:
            'In lead-up to Colombian elections, woman mayoral candidate is latest assassination victim',
          href: {
            pathname: '/',
            query: {
              alias:
                '/stories/2019-09-06/lead-colombian-elections-woman-mayoral-candidate-latest-assassination-victim'
            }
          }
        },
        {
          label:
            "Folk trio The Young'uns uses music to question British patriotism",
          href: {
            pathname: '/',
            query: {
              alias:
                '/stories/2019-09-06/folk-trio-younguns-uses-music-question-british-patriotism'
            }
          }
        },
        {
          label:
            'Statement pieces: Fashion designers worry over Brexit’s cost to UK industry',
          href: {
            pathname: '/',
            query: {
              alias:
                '/stories/2019-10-25/statement-pieces-fashion-designers-worry-over-brexit-s-cost-uk-industry'
            }
          }
        }
      ]
    }
  };

  res.status(200).json(apiResp);
};
