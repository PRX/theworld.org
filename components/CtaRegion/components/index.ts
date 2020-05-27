import { CtaMessageInfo } from './CtaMessageInfo';
import { CtaMessageDonation } from './CtaMessageDonation';
import { CtaMessageOptIn } from './CtaMessageOptIn';
import { CtaMessageNewsletter } from './CtaMessageNewsletter';

export * from './CtaMessageDonation';
export * from './CtaMessageInfo';
export * from './CtaMessageNewsletter';
export * from './CtaMessageOptIn';

export const ctaTypeComponentMap = {
  info: CtaMessageInfo,
  donation: CtaMessageDonation,
  optin: CtaMessageOptIn,
  newsletter: CtaMessageNewsletter
};
