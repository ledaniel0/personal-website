"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Project {
  title: string
  description: string
  technologies: string[]
  githubLink: string
}

const projects: Project[] = [
  {
    title: "Serenity",
    description: "Healthcare platform automating prior authorizations",
    technologies: ["AWS Bedrock", "Python", "React", "Django", "Amazon S3", "RAG Pipeline", "Amazon Titan"],
    githubLink: "https://github.com/airjlee/Monch",
  },
  {
    title: "Monch",
    description: "Social mobile platform for restaurant suggestions",
    technologies: [
      "TypeScript",
      "React Native",
      "SpringBoot",
      "Node.js",
      "AWS",
      "PostgreSQL",
      "Redux",
      "Docker",
      "Kubernetes",
      "Firebase",
    ],
    githubLink: "https://github.com/airjlee/serenity",
  },
  {
    title: "Bankly",
    description: "Loan analysis automation application",
    technologies: ["AWS Bedrock", "Python", "React", "Javascript", "Amazon S3"],
    githubLink: "https://github.com/ledaniel0/bankly",
  },
]

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.a
      href={project.githubLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full sm:w-1/2 lg:w-1/3 p-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full transition-colors duration-300 hover:bg-gray-700">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 gradient-text">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2 mb-2">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  )
}

const ProjectsShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Featured Projects</h2>
        <div className="flex flex-wrap -mx-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase

