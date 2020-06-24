/**
 * @file app.ts
 * Gather homepage data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResp = {
    type: 'homepage',
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
  };

  res.status(200).json(apiResp);
};
