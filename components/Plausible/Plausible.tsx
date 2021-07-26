/**
 * @file Plausible.tsx
 * Component for triggering Plausible events.
 */

import React, { useEffect } from 'react';
import { usePlausible } from 'next-plausible';

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

export const Plausible = ({ events, keys = [null, null] }: IPlausibleProps) => {
  const plausible = usePlausible();

  useEffect(() => {
    (window as any).plausible =
      (window as any).plausible ||
      function p(...rest: PlausibleEventArgs) {
        ((window as any).plausible.q = (window as any).plausible.q || []).push(
          rest
        );
      };
    (window as any).plausible.isProxy = true;

    return () => {
      delete (window as any).plausible;
    };
  }, []);

  useEffect(() => {
    console.log('Sending events', events);

    (events || []).forEach(args => plausible.apply(this, args));
  }, keys);

  return <></>;
};
