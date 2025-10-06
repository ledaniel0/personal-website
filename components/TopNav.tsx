"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

const sections = [
  { id: "hero", label: "Home" },
  { id: "education", label: "Education" },
  { id: "timeline", label: "Experience" },
  { id: "projects", label: "Projects" },
]

const TopNav: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 })

  const [active, setActive] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position with an offset for the fixed nav
      const scrollPosition = window.scrollY + 150
      
      // Check each section from bottom to top
      // The last section whose top we've scrolled past is the active one
      let currentSection = "hero"
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const el = document.getElementById(section.id)
        if (!el) continue
        
        const sectionTop = el.offsetTop
        
        // If we've scrolled past this section's top, it's the active one
        if (scrollPosition >= sectionTop) {
          currentSection = section.id
          break
        }
      }
      
      setActive(currentSection)
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-gray-900/60 px-4 py-2 backdrop-blur-md">
          <ul className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative rounded-full px-3 py-1 text-sm transition-colors ${
                    active === s.id ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {s.label}
                  {active === s.id && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-violet-500"
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
      />
    </header>
  )
}

export default TopNav
