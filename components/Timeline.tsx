"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TimelineItem {
  date: string
  title: string
  company: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    date: "June 2025 - Sep 2025",
    title: "Software Development Engineer Intern",
    company: "Amazon",
    description: "Incoming SDE Intern at Amazon this Summer in Bellevue.",
  },
  {
    date: "Dec 2024 - Present",
    title: "Project Member",
    company: "DubHacks Next",
    description:
      "Selected to a UW startup incubator program where I am a part of a cohort of entrepeneurial-minded students.",
  },
  {
    date: "Mar 2024 - Present",
    title: "Software Developer",
    company: "University of Washington",
    description: "In March 2024, I began as a Software Developer at SEAL at the University of Washington.",
  },
  {
    date: "Mar 2024 - Nov 2024",
    title: "Machine Learning Research Assistant",
    company: "University of Washington",
    description:
      "Started in March 2024 as a Research Assistant at DAIS at the University of Washington where I research machine learning protein modeling.",
  },
  {
    date: "June 2023 - Aug 2023",
    title: "Software Engineer Intern",
    company: "Datascience9",
    description: "Worked mainly on the backend at Datascience9 as a Software Engineering Intern during Summer 2023",
  },
]

const Timeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold mb-16 text-center gradient-text">Experience</h2>
        <div className="relative">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-20 h-px bg-blue-500 opacity-50 mr-4"></div>
                <div className="text-sm text-blue-400 font-medium">{item.date}</div>
              </div>
              <motion.div
                className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                whileHover={{ y: -5 }}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <h4 className="text-md font-medium text-blue-300 mb-2">{item.company}</h4>
                </div>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.p
                      className="mt-4 text-gray-300 text-sm leading-relaxed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline

