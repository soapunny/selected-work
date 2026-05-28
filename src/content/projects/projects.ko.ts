// src/content/projects/projects.ko.ts

import type { Project } from "./types";

export const projectsKo: Project[] = [
  {
    slug: "reel",
    title: "REEL",
    description: "실시간 검색과 무한 스크롤이 있는 영화 탐색 앱",
    year: "2026",
    tags: ["React", "TypeScript", "TMDB API"],
    featured: false,
    github: "https://github.com/soapunny/streaming-service",
  },
  {
    slug: "pocketquest",
    title: "PocketQuest",
    description: "플랜 기반 가계부 — 기간 로직과 구조화된 데이터 모델링",
    year: "2026",
    tags: ["모바일", "가계부", "React Native"],
    featured: true,
    github: "https://github.com/soapunny/PocketQuest",
  },
  {
    slug: "facebook-chatbot",
    title: "Facebook Chatbot",
    description: "Messenger 기반 고객 응대 자동화 봇",
    year: "2023",
    tags: ["챗봇", "자동화", "Java"],
    featured: false,
    github: "https://github.com/soapunny/FBMessagingBot",
  },
];
