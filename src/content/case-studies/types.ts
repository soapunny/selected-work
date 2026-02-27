// src/content/case-studies/types.ts

import type { BundledLanguage } from "shiki";

export type CaseStudyDemo = { embedUrl: string; caption: string } | null;

export type CaseStudyCard = {
  title: string;
  body: string;
};

export type CaseStudySnippet = {
  title: string;
  subtitle: string;
  lang: BundledLanguage;
  code: string;
};

export type CaseStudy = {
  labels: {
    demoTitle: string;
    demoBadge: string;
    architectureTitle: string;
    architectureBadge: string;
    domainTitle: string;
    domainBadge: string;
    selectedTitle: string;
    selectedBadge: string;
  };
  demo: CaseStudyDemo;
  architectureIntro: string;
  architectureFlow: string;
  domainIntro: string;
  impact: string;
  tradeoffs: string;
  domainCards: CaseStudyCard[];
  exampleNote: string;
  selectedIntro: string;
  snippets: CaseStudySnippet[];
  selectedFooter: string;
  patternNote: string;
};
