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
  events: PlausibleEventArgs[];
  keys: string[];
}

export const Plausible = ({ events, keys }: IPlausibleProps) => {
  const plausible = usePlausible();

  useEffect(() => {
    console.log('Sending events', events);
    (events || []).forEach(args => plausible.apply(this, args));
  }, keys);

  return <></>;
};
