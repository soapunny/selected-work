// src/content/pages/types.ts

export type PageHeaderCopy = {
  kicker?: string;
  title: string;
  description?: string;
};

export type HomeCopy = {
  hero: {
    nameLine: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  featured: {
    heading: string;
    viewAll: string;
    primaryCardCta: string;
    primaryCardBlurb: string;
  };
};

export type AboutCopy = {
  header: PageHeaderCopy;
  sections: {
    approachTitle: string;
    approachBody: string;
    focusTitle: string;
    focusBody: string;
    coreStackTitle: string;
    coreStackItems: string[];
    closingTitle: string;
    closingBody: string;
    closingCta: string;
  };
};

export type ContactCopy = {
  header: PageHeaderCopy;
  sections: {
    waysTitle: string;
    responseNote: string;
    basedInTitle: string;
    basedInValue: string;
    focusTitle: string;
    focusBody: string;
    actions: { email: string; github: string; resume: string };
  };
};

export type ProjectsPageCopy = {
  header: PageHeaderCopy;
  featuredHeading: string;
  featuredCardCta: string;
  moreHeading: string;
  contactCta: string;
};
