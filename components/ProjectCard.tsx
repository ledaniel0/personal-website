"use client"

import type React from "react"
import { motion } from "framer-motion"

type ProjectCardProps = {
  title: string
  description: string
  tags: string[]
  href: string
  icon: React.ReactNode
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, href, icon }) => {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className="group block h-full" 
      whileHover={{ y: -2 }} 
      transition={{ duration: 0.15 }}
    >
      <div className="rounded-lg border border-theme-border-subtle bg-theme-surface-base hover:bg-theme-surface-hover hover:border-theme-border-medium transition-all duration-150 h-full overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-theme-accent-blue-bg flex items-center justify-center text-theme-accent-blue">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-theme-text-primary group-hover:text-theme-accent-blue transition-colors">
              {title}
            </h3>
          </div>
          
          <p className="text-sm text-theme-text-secondary mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((t) => (
              <span 
                key={t} 
                className="px-3 py-1 text-xs rounded border border-theme-accent-blue/20 bg-theme-accent-blue-bg text-theme-accent-blue"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export default ProjectCard

