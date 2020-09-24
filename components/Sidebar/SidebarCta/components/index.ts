import { SidebarCtaMessageInfo } from './SidebarCtaMessageInfo';
import { SidebarCtaMessageDonation } from './SidebarCtaMessageDonation';
import { SidebarCtaMessageOptIn } from './SidebarCtaMessageOptIn';
import { SidebarCtaMessageNewsletter } from './SidebarCtaMessageNewsletter';

export * from './SidebarCtaMessageDonation';
export * from './SidebarCtaMessageInfo';
export * from './SidebarCtaMessageNewsletter';
export * from './SidebarCtaMessageOptIn';

export const ctaTypeComponentMap = {
  info: SidebarCtaMessageInfo,
  donation: SidebarCtaMessageDonation,
  optin: SidebarCtaMessageOptIn,
  newsletter: SidebarCtaMessageNewsletter
};
