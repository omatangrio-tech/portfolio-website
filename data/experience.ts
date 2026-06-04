export interface Experience {
  id: string;
  role: string;
  company: string;
  duration?: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Frontend Web Developer",
    company: "Angrio Technologies",
    duration: "2022 – Present (2.5 Years)",
    points: [
      "Built and maintained scalable frontend applications using React.js and Next.js",
      "Developed cross-platform mobile apps using Angular and Ionic Framework",
      "Integrated Firebase and Supabase backends with real-time data features",
      "Collaborated with design and backend teams to deliver pixel-perfect UI"
    ]
  },
  {
    id: "exp-2",
    role: "Software Developer",
    company: "Angrio Technologies",
    points: [
      "Worked on The Leansuite platform using Next.js, TypeScript, and Tailwind CSS",
      "Implemented Sanity CMS for dynamic content management",
      "Deployed and managed projects on Vercel with CI/CD pipelines",
      "Used GitHub for version control and team collaboration"
    ]
  }
];
