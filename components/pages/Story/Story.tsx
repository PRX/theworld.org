/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext, useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppContext } from '@contexts/AppContext';
import { MetaTags } from '@components/MetaTags';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { RootState, UiAction } from '@interfaces/state';
import { parseUtcDate } from '@lib/parse/date';
import { fetchStoryData } from '@store/actions/fetchStoryData';
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
    resourceDevelopment
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
      'Resource Development': resourceDevelopment
    }),
    ...(dateBroadcast &&
      (() => {
        const dt = parseUtcDate(dateBroadcast * 1000);
        return {
          'Broadcast Year': dt[0],
          'Broadcast Month': dt.slice(0, 1).join('-'),
          'Broadcast Date': dt.join('-')
        };
      })()),
    ...(datePublished &&
      (() => {
        const dt = parseUtcDate(datePublished * 1000);
        return {
          'Published Year': dt[0],
          'Published Month': dt.slice(0, 1).join('-'),
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
    // Show social hare menu.
    const { shareLinks } = data;
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

    return () => {
      // Show social hare menu.
      store.dispatch<UiAction>({
        type: 'UI_HIDE_SOCIAL_SHARE_MENU'
      });
    };
  }, [data.shareLinks]);

  useEffect(() => {
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <LayoutComponent data={data} />
    </>
  );
};

export const fetchData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const type = 'node--stories';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    // Get content data.
    await dispatch<any>(fetchStoryData(id));
  }
};
