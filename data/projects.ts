export type ProjectData = {
  slug: string
  title: string
  description: string
  tags: string[]
  href: string
  icon: string // lucide icon name
}

export const projects: ProjectData[] = [
  {
    slug: "serenity",
    title: "Serenity",
    description: "Healthcare platform automating prior authorizations",
    tags: ["AWS Bedrock", "Python", "React"],
    href: "https://github.com/airjlee/serenity",
    icon: "activity",
  },
  {
    slug: "monch",
    title: "Monch",
    description: "Social mobile platform for restaurant suggestions",
    tags: ["TypeScript", "React Native", "SpringBoot"],
    href: "https://github.com/airjlee/Monch",
    icon: "utensils",
  },
  {
    slug: "bankly",
    title: "Bankly",
    description: "Loan analysis automation application",
    tags: ["AWS Bedrock", "Python", "React"],
    href: "https://github.com/ledaniel0/bankly",
    icon: "banknote",
  },
  {
    slug: "wedding-planner",
    title: "Wedding Planner",
    description: "Full-stack wedding planning application",
    tags: ["TypeScript", "React", "Node.js"],
    href: "https://github.com/ledaniel0/wedding-planner",
    icon: "heart",
  },
  {
    slug: "double-pendulum",
    title: "Double Pendulum",
    description: "Visualization of a chaotic double pendulum system",
    tags: ["Python", "Matplotlib", "Numpy"],
    href: "https://github.com/ledaniel0/DoublePendulum",
    icon: "waveform",
  },
]

