"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

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
  {
    date: "August 2018 - Present",
    title: "Youth Soccer Referee",
    company: "U.S. Soccer Federation",
    description: "In August 2018, I began refereeing youth soccer games for the U.S. Soccer Federation.",
  },
]

const Timeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-16 text-center gradient-text">Experience</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-500 opacity-20"></div>
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="mb-12 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-1/2 pr-8 text-right">
                <div className="text-sm text-blue-400 font-medium mb-1">{item.date}</div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <h4 className="text-md font-medium text-blue-300">{item.company}</h4>
              </div>
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <motion.div
                className="w-1/2 pl-8"
                initial="collapsed"
                animate={expandedIndex === index ? "expanded" : "collapsed"}
                variants={{
                  expanded: { height: "auto", opacity: 1 },
                  collapsed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    {expandedIndex === index ? (
                      <ChevronUp className="text-blue-400 w-5 h-5" />
                    ) : (
                      <ChevronDown className="text-blue-400 w-5 h-5" />
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline