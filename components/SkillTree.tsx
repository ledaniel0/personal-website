"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
  color: string
}

const skills: Skill[] = [
  { name: "Java", level: 90, color: "bg-red-500" },
  { name: "TypeScript", level: 85, color: "bg-blue-500" },
  { name: "Python", level: 80, color: "bg-green-500" },
  { name: "React", level: 85, color: "bg-purple-500" },
  { name: "Node.js", level: 80, color: "bg-yellow-500" },
  { name: "AWS", level: 75, color: "bg-orange-500" },
  { name: "Machine Learning", level: 70, color: "bg-pink-500" },
  { name: "Docker", level: 75, color: "bg-indigo-500" },
]

const SkillTree: React.FC = () => {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-600">
                  <motion.div
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
              <p className="text-right text-sm text-gray-400">{skill.level}%</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillTree

