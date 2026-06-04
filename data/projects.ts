export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  liveDemo: string;
  github: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    name: "The Leansuite",
    description: "A comprehensive lean management platform built for businesses to streamline their operations and improve productivity.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Angular"],
    liveDemo: "https://www.theleansuite.com/",
    github: "https://github.com/omatangrio-tech"
  },
  {
    id: "project-2",
    name: "Gym Management System",
    description: "A full-featured gym management system for tracking memberships, attendance, payments, and workout plans.",
    tags: ["React.js", "Firebase", "Tailwind CSS", "TypeScript"],
    liveDemo: "#",
    github: "https://github.com/omatangrio-tech"
  },
  {
    id: "project-3",
    name: "Tiffin Delivery App",
    description: "A modern tiffin delivery application connecting home cooks with customers — featuring order tracking, menu management, and real-time updates.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
    liveDemo: "#",
    github: "https://github.com/omatangrio-tech"
  }
];
