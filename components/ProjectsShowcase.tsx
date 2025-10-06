"use client"

import type React from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Activity, Utensils, Banknote, Heart, LineChart } from "lucide-react"
import ProjectCard from "./ProjectCard"
import { projects as projectData } from "@/data/projects"

const iconMap: Record<string, React.ReactNode> = {
  activity: <Activity size={18} />,
  utensils: <Utensils size={18} />,
  banknote: <Banknote size={18} />,
  heart: <Heart size={18} />,
  waveform: <LineChart size={18} />,
}

const ProjectItem: React.FC<{ index: number; p: (typeof projectData)[number] }> = ({ index, p }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.3 })

  // Parallax effect for cards
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [20, -20])

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
      <ProjectCard
        title={p.title}
        description={p.description}
        tags={p.tags}
        href={p.href}
        icon={iconMap[p.icon]}
      />
    </motion.div>
  )
}

const ProjectsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <section id="projects" ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <motion.div
            className="text-xs uppercase tracking-[0.2em] text-white/80 font-medium mb-3"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            Projects
          </motion.div>
        </div>
        <div className="flex flex-wrap -mx-4">
          {projectData.map((p, index) => (
            <ProjectItem key={p.slug} p={p} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase

