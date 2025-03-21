"use client"

import type React from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

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
    githubLink: "https://github.com/airjlee/serenity",
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
    githubLink: "https://github.com/airjlee/Monch",
  },
  {
    title: "Bankly",
    description: "Loan analysis automation application",
    technologies: ["AWS Bedrock", "Python", "React", "Javascript", "Amazon S3"],
    githubLink: "https://github.com/ledaniel0/bankly",
  },
  {
    title: "Wedding Planner",
    description: "Full-stack wedding planning application",
    technologies: ["TypeScript", "HTML", "React", "Node.js", "Express"],
    githubLink: "https://github.com/ledaniel0/wedding-planner",
  },
  {
    title: "Double Pendulum",
    description: "visualization project of a double pendulum system to demonstrate the system's behavior",
    technologies: ["Python", "Matplotlib", "Numpy", "Scipy"],
    githubLink: "https://github.com/ledaniel0/DoublePendulum",
  },
]

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.3 })

  // Parallax effect for cards
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div
      ref={cardRef}
      className="w-full sm:w-1/2 lg:w-1/3 p-4"
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 50,
      }}
    >
      <motion.a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full transition-all duration-300"
          whileHover={{
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(45, 55, 72, 1)",
          }}
        >
          <div className="p-6">
            <motion.h3
              className="text-2xl font-bold mb-2 gradient-text"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {project.description}
            </motion.p>
            <motion.div
              className="flex flex-wrap"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {project.technologies.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2 mb-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{
                    delay: 0.5 + index * 0.1 + techIndex * 0.05,
                    type: "spring",
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.a>
    </motion.div>
  )
}

const ProjectsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          Featured Projects
        </motion.h2>
        <div className="flex flex-wrap -mx-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase

