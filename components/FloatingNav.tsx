"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const handleScroll = () => {
      const sections = ["hero", "timeline", "projects", "skills", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "timeline", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <motion.nav
      className="fixed bottom-4 left-1/2 transform -translate-x-1/3 z-50"
      style={{ opacity: navOpacity }}
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
    >
      <motion.ul
        className="flex space-x-2 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-full px-3 py-2 shadow-lg text-sm"
        layout
      >
        {navItems.map((item) => (
          <motion.li key={item.id} className="relative">
            <a
              href={`#${item.id}`}
              className={`relative z-10 px-2 py-1 rounded-full inline-block transition-colors duration-300 ${
                activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </a>
            {activeSection === item.id && (
              <motion.div
                className="absolute inset-0 bg-blue-600 rounded-full"
                layoutId="activeSection"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  )
}

export default FloatingNav

