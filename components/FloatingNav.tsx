"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <motion.nav
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
    >
      <ul className="flex space-x-4 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-full px-6 py-3 shadow-lg">
        <li>
          <a href="#hero" className="text-white hover:text-blue-300 transition duration-300">
            Home
          </a>
        </li>
        <li>
          <a href="#timeline" className="text-white hover:text-blue-300 transition duration-300">
            Experience
          </a>
        </li>
        <li>
          <a href="#projects" className="text-white hover:text-blue-300 transition duration-300">
            Projects
          </a>
        </li>
        <li>
          <a href="#skills" className="text-white hover:text-blue-300 transition duration-300">
            Skills
          </a>
        </li>
        <li>
          <a href="#contact" className="text-white hover:text-blue-300 transition duration-300">
            Contact
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}

export default FloatingNav

