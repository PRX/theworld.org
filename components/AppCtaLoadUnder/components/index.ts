import { AppCtaMessageInfo } from './AppCtaMessageInfo';
import { AppCtaMessageDonation } from './AppCtaMessageDonation';
import { AppCtaMessageOptIn } from './AppCtaMessageOptIn';
import { AppCtaMessageNewsletter } from './AppCtaMessageNewsletter';

export * from './AppCtaMessageDonation';
export * from './AppCtaMessageInfo';
export * from './AppCtaMessageNewsletter';
export * from './AppCtaMessageOptIn';

export const ctaTypeComponentMap = {
  info: AppCtaMessageInfo,
  donation: AppCtaMessageDonation,
  optin: AppCtaMessageOptIn,
  newsletter: AppCtaMessageNewsletter
};
