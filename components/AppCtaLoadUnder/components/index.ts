import { AppCtaMessageInfo } from './AppCtaMessageInfo';
import { AppCtaMessageDonation } from './AppCtaMessageDonation';
import { AppCtaMessageOptIn } from './AppCtaMessageOptIn';

export * from './AppCtaMessageDonation';
export * from './AppCtaMessageInfo';
// export * from './CtaMessageNewsletter';
// export * from './CtaMessageOptIn';

export const ctaTypeComponentMap = {
  info: AppCtaMessageInfo,
  donation: AppCtaMessageDonation,
  optin: AppCtaMessageOptIn
};
