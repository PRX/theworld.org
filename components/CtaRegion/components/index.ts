import { CtaMessageInfo } from './CtaMessageInfo';
import { CtaMessageDonation } from './CtaMessageDonation';
import { CtaMessageOptIn } from './CtaMessageOptIn';
import { CtaMessageNewsletter } from './CtaMessageNewsletter';

export * from './CtaMessageDonation';
export * from './CtaMessageInfo';
export * from './CtaMessageNewsletter';
export * from './CtaMessageOptIn';

const ctaTypeComponentMap = new Map();
ctaTypeComponentMap.set('info', CtaMessageInfo);
ctaTypeComponentMap.set('donation', CtaMessageDonation);
ctaTypeComponentMap.set('optin', CtaMessageOptIn);
ctaTypeComponentMap.set('newsletter', CtaMessageNewsletter);

export { ctaTypeComponentMap };
