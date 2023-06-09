import { AppCtaMessageInfo } from './AppCtaMessageInfo';
import { AppCtaMessageDonation } from './AppCtaMessageDonation';
import { AppCtaMessageOptIn } from './AppCtaMessageOptIn';
import { AppCtaMessageNewsletter } from './AppCtaMessageNewsletter';

export * from './AppCtaMessageDonation';
export * from './AppCtaMessageInfo';
export * from './AppCtaMessageNewsletter';
export * from './AppCtaMessageOptIn';

const ctaTypeComponentMap = new Map();
ctaTypeComponentMap.set('info', AppCtaMessageInfo);
ctaTypeComponentMap.set('donation', AppCtaMessageDonation);
ctaTypeComponentMap.set('optin', AppCtaMessageOptIn);
ctaTypeComponentMap.set('newsletter', AppCtaMessageNewsletter);

export { ctaTypeComponentMap };
