/**
 * @file Plausible.tsx
 * Component for triggering Plausible events.
 */

import { useEffect } from 'react';
import { usePlausible } from 'next-plausible';

declare type Props = Record<string, unknown> | never;
declare type EventOptions<P extends Props> = {
  props: P;
  callback?(): void;
};
export type PlausibleEventArgs = [string, EventOptions<any>];
export interface IPlausibleProps {
  events?: PlausibleEventArgs[];
  subject: {
    type: string;
    id: string;
  };
}

export const Plausible = ({
  events,
  subject: { type, id }
}: IPlausibleProps) => {
  const plausible = usePlausible();

  useEffect(() => {
    (window as any).plausible =
      (window as any).plausible ||
      function p(...rest: PlausibleEventArgs) {
        ((window as any).plausible.q = (window as any).plausible.q || []).push(
          rest
        );
      };
  }, []);

  useEffect(() => {
    (events || []).forEach((args) => plausible.apply(this, args));
  }, [type, id, events, plausible]);

  return null;
};
