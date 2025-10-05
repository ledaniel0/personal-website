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
    <motion.a href={href} target="_blank" rel="noreferrer" className="block h-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <div className="rounded-2xl border border-white/10 bg-gray-800/70 hover:bg-gray-800/80 transition-colors h-full overflow-hidden">
        <div className="h-14 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 flex items-center px-4">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80">
            {icon}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-white/70 text-sm mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 text-blue-300 text-sm">View code →</div>
        </div>
      </div>
    </motion.a>
  )
}

export default ProjectCard

