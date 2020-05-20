import { AppCtaMessageInfo } from './AppCtaMessageInfo';
import { AppCtaMessageDonation } from './AppCtaMessageDonation';

export * from './AppCtaMessageDonation';
export * from './AppCtaMessageInfo';
// export * from './CtaMessageNewsletter';
// export * from './CtaMessageOptIn';

export const ctaTypeComponentMap = {
  info: AppCtaMessageInfo,
  donation: AppCtaMessageDonation
};
