// src/content/projects/projects.ts

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  featured: boolean;
};

const projects: Project[] = [
  {
    slug: "pocketquest",
    title: "PocketQuest",
    description: "Plan-based budgeting with structured periods",
    year: "2026",
    tags: ["Mobile", "Budgeting", "React Native"],
    featured: true,
  },
  {
    slug: "facebook-chatbot",
    title: "Facebook Chatbot",
    description: "Automated customer engagement via Messenger",
    year: "2023",
    tags: ["Chatbot", "Automation", "Node.js"],
    featured: false,
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
