/**
 * @file Plausible.tsx
 * Component for triggering Plausible events.
 */

import React, { useEffect, useState } from 'react';
import PlausibleProvider, { usePlausible } from 'next-plausible';
import { analytics } from '@config';

declare type Props = Record<string, unknown> | never;
declare type EventOptions<P extends Props> = {
  props: P;
  callback?: VoidFunction;
};
export type PlausibleEventArgs = [string, EventOptions<any>];
export interface IPlausibleProps {
  events?: PlausibleEventArgs[];
  keys?: string[];
}

export const Plausible = ({ events, keys = [] }: IPlausibleProps) => {
  const plausible = usePlausible();
  const [enablePlausible, setEnablePlausible] = useState(false);
  const [plausibleDomain, setPlausibleDomain] = useState(analytics.domain);

  useEffect(() => {
    setPlausibleDomain((window as any)?.location.hostname || analytics.domain);

    (window as any).plausible =
      (window as any).plausible ||
      function p(...rest: PlausibleEventArgs) {
        ((window as any).plausible.q = (window as any).plausible.q || []).push(
          rest
        );
      };
    (window as any).plausible.proxy = true;

    return () => {
      delete (window as any).plausible;
    };
  }, []);

  useEffect(() => {
    // Determine if Plausible should be enabled.
    setEnablePlausible(
      !(window as any)?.plausible || (window as any).plausible.proxy
    );

    console.log('Enable Plausible', enablePlausible);
    console.log('Sending events', events);

    (events || []).forEach(args => plausible.apply(this, args));
  }, keys);

  return (
    <PlausibleProvider
      domain={plausibleDomain}
      enabled={enablePlausible}
      selfHosted
      trackOutboundLinks
    >
      <></>
    </PlausibleProvider>
  );
};
