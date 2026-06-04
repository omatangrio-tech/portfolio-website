export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: 'Live' | 'In Progress' | 'Case Study';
  role: string;
  impact: string;
  highlight: string;
  liveDemo: string;
  github: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    name: "The Leansuite",
    description: "A comprehensive lean management platform built for businesses to streamline their operations and improve productivity.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Angular"],
    status: "Live",
    role: "Frontend Engineer",
    impact: "Improved workflow visibility for multiple teams",
    highlight: "Built responsive dashboards and performance-focused UI flows.",
    liveDemo: "https://www.theleansuite.com/",
    github: "https://github.com/omatangrio-tech"
  },
  {
    id: "project-2",
    name: "Gym Management System",
    description: "A full-featured gym management system for tracking memberships, attendance, payments, and workout plans.",
    tags: ["React.js", "Firebase", "Tailwind CSS", "TypeScript"],
    status: "In Progress",
    role: "Fullstack Developer",
    impact: "Designed to reduce manual admin operations for gym owners",
    highlight: "Focused on member lifecycle, payment tracking, and trainer workflows.",
    liveDemo: "#",
    github: "https://github.com/omatangrio-tech"
  },
  {
    id: "project-3",
    name: "Tiffin Delivery App",
    description: "A modern tiffin delivery application connecting home cooks with customers — featuring order tracking, menu management, and real-time updates.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
    status: "Case Study",
    role: "Product + Frontend",
    impact: "Planned conversion-focused ordering and retention journey",
    highlight: "Mapped product flows and UI architecture for scalable delivery ops.",
    liveDemo: "#",
    github: "https://github.com/omatangrio-tech"
  }
];
