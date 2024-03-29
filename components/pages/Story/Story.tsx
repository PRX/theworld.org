/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { AppContext } from '@contexts/AppContext';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { UiAction } from '@interfaces/state';
import { parseUtcDate } from '@lib/parse/date';
import { getDataByResource } from '@store/reducers';
import { layoutComponentMap } from './layouts';

export const Story = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const [state, updateForce] = useState(store.getState());
  const unsub = store.subscribe(() => {
    updateForce(store.getState());
  });
  const data = getDataByResource(state, type, id);
  const {
    metatags: dataMetatags,
    title,
    bylines,
    dateBroadcast,
    datePublished,
    displayTemplate,
    format,
    resourceDevelopment,
    shareLinks
  } = data;
  const metatags = {
    ...dataMetatags,
    ...((dateBroadcast || datePublished) && {
      pubdate: parseUtcDate((dateBroadcast || datePublished) * 1000).join('-')
    })
  };
  const LayoutComponent =
    layoutComponentMap[displayTemplate] || layoutComponentMap.standard;
  const props = {
    Title: title,
    ...(format && { 'Story Format': format.title }),
    ...(resourceDevelopment && {
      'Resource Development': resourceDevelopment.title
    }),
    ...(dateBroadcast &&
      (() => {
        const dt = parseUtcDate(dateBroadcast * 1000);
        return {
          'Broadcast Year': dt[0],
          'Broadcast Month': dt.slice(0, 2).join('-'),
          'Broadcast Date': dt.join('-')
        };
      })()),
    ...(datePublished &&
      (() => {
        const dt = parseUtcDate(datePublished * 1000);
        return {
          'Published Year': dt[0],
          'Published Month': dt.slice(0, 2).join('-'),
          'Published Date': dt.join('-')
        };
      })())
  };
  const plausibleEvents: PlausibleEventArgs[] = [['Story', { props }]];

  if (bylines) {
    bylines.forEach(([, persons]) => {
      persons.forEach(({ title: name }) => {
        plausibleEvents.push([
          `Person: ${name}`,
          {
            props: { 'Page Type': 'Story' }
          }
        ]);
      });
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(plausibleEvents);
  }

  useEffect(() => {
    if (shareLinks) {
      store.dispatch<UiAction>({
        type: 'UI_SHOW_SOCIAL_SHARE_MENU',
        payload: {
          ui: {
            socialShareMenu: {
              links: [
                {
                  key: 'twitter',
                  link: shareLinks.twitter
                },
                {
                  key: 'facebook',
                  link: shareLinks.facebook
                },
                {
                  key: 'linkedin',
                  link: shareLinks.linkedin
                },
                {
                  key: 'flipboard',
                  link: shareLinks.flipboard
                },
                {
                  key: 'whatsapp',
                  link: shareLinks.whatsapp
                },
                {
                  key: 'email',
                  link: shareLinks.email
                }
              ]
            }
          }
        }
      });
    }
    return () => {
      // Show social hare menu.
      store.dispatch<UiAction>({
        type: 'UI_HIDE_SOCIAL_SHARE_MENU'
      });
    };
  }, [shareLinks, store]);

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  return (
    <>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <LayoutComponent data={data} />
    </>
  );
};
