"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence, useSpring } from "framer-motion"

interface TimelineItem {
  date: string
  title: string
  company: string
  description: string
  link?: string
}

const timelineData: TimelineItem[] = [
  {
    date: "June 2025 - Sep 2025",
    title: "Software Development Engineer Intern",
    company: "Salesforce",
    description: "Incoming SDE Intern at Salesforce this Summer in Bellevue.",
    link: "https://www.salesforce.com/"
  },
  {
    date: "Dec 2024 - Present",
    title: "Project Member",
    company: "DubHacks Next",
    description:
      "Selected to a UW startup incubator program where I am a part of a cohort of entrepreneurial-minded students.",
    link: "https://dubhacks.com"
  },
  {
    date: "Mar 2024 - Present",
    title: "Software Developer",
    company: "University of Washington",
    description: "In March 2024, I began as a Software Developer at SEAL at the University of Washington.",
    link: "https://www.uwseal.org/"
  },
  {
    date: "Mar 2024 - Nov 2024",
    title: "Machine Learning Research Assistant",
    company: "University of Washington",
    description:
      "Started in March 2024 as a Research Assistant at DAIS at the University of Washington where I research machine learning protein modeling.",
    link: "https://sites.google.com/uw.edu/dais-uw"
  },
  {
    date: "June 2023 - Aug 2023",
    title: "Software Engineer Intern",
    company: "Datascience9",
    description: "Worked mainly on the backend at Datascience9 as a Software Engineering Intern during Summer 2023",
    link: "https://datascience9.com"
  },
  {
    date: "August 2018 - Present",
    title: "Youth Soccer Referee",
    company: "U.S. Soccer Federation",
    description: "In August 2018, I began refereeing youth soccer games for the U.S. Soccer Federation.",
    link: "https://www.ussoccer.com"
  },
]

const TimelineItem: React.FC<{
  item: TimelineItem
  index: number
  isActive: boolean
  onClick: () => void
  isEven: boolean
}> = ({ item, index, isActive, onClick, isEven }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: false, amount: 0.3 })

  // Spring animation for the dot
  const dotScale = useSpring(1, { stiffness: 300, damping: 20 })

  return (
    <motion.div
      ref={itemRef}
      className="mb-16 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
    >
      {/* Interactive dot with plus/minus */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10 cursor-pointer"
        style={{ top: 10 }}
        onClick={onClick}
      >
        <motion.div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${isActive ? "bg-blue-500" : "bg-blue-600"} bg-opacity-20`}
          whileHover={{ scale: 1.1 }}
          style={{ scale: dotScale }}
          animate={{
            boxShadow: isActive ? "0 0 0 4px rgba(96, 165, 250, 0.2)" : "0 0 0 0px rgba(96, 165, 250, 0)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="w-2 h-0.5 bg-blue-400 absolute" />
          <motion.div
            className="h-2 w-0.5 bg-blue-400 absolute"
            animate={{
              opacity: isActive ? 0 : 1,
              rotate: isActive ? 90 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Content card */}
      <motion.div
        className={`relative z-20 ${isEven ? "ml-auto pr-8" : "mr-auto pl-8"}`}
        style={{ width: "calc(50% - 15px)" }}
        layout
      >
        <motion.div
          className={`cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
            isActive ? "bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg" : ""
          }`}
          whileHover={{
            scale: isActive ? 1 : 1.02,
            backgroundColor: isActive ? "" : "rgba(30, 41, 59, 0.2)",
          }}
          onClick={onClick}
          layout
        >
          <motion.div className="p-4" layout>
            <motion.div
              className={`text-blue-300 text-sm font-medium mb-2 ${isEven ? "text-right" : "text-left"}`}
              animate={{
                color: isActive ? "#93c5fd" : "#60a5fa",
                fontWeight: isActive ? "600" : "500",
              }}
              layout
            >
              {item.date}
            </motion.div>

            <motion.h3
              className={`text-lg font-bold text-white mb-1 ${isEven ? "text-right" : "text-left"}`}
              animate={{
                fontSize: isActive ? "1.25rem" : "1.125rem",
                letterSpacing: isActive ? "0.01em" : "normal",
              }}
              layout
            >
              {item.title}
            </motion.h3>

            <motion.h4
              className={`text-sm font-medium text-blue-300 mb-2 ${isEven ? "text-right" : "text-left"}`}
              layout
            >
              {item.company}
            </motion.h4>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  className={`text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-3 mt-3 ${isEven ? "text-right" : "text-left"}`}
                  initial={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 12, paddingTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <p>{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const Timeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 overflow-hidden" id="timeline">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          Experience
        </motion.h2>

        <motion.div className="relative max-w-3xl mx-auto" layout>
          {/* Center timeline line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-600"
            style={{
              height: "100%",
              top: 0,
              opacity: 0.4,
            }}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              onClick={() => toggleItem(index)}
              isEven={index % 2 === 0}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline