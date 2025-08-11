"use client"

import type React from "react"
import { useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"

type Experience = {
  date: string
  title: string
  company: string
  description: string
  link?: string
}

const EXPERIENCES: Experience[] = [
  {
    date: "Sep 2025 - Dec 2025",
    title: "Software Development Engineer Intern",
    company: "Amazon",
    description: "Software Development Engineer Intern at Amazon in Summer of 2025 in Bellevue, WA.",
    link: "https://www.amazon.com/",
  },
  {
    date: "June 2025 - Sep 2025",
    title: "Software Engineer Intern",
    company: "Salesforce",
    description: "Software Engineer Intern at Salesforce in Summer of 2025 in Bellevue, WA.",
    link: "https://www.salesforce.com/",
  },
  {
    date: "Dec 2024 - June 2025",
    title: "Project Member",
    company: "DubHacks Next",
    description:
      "Selected to a UW startup incubator program where I am a part of a cohort of entrepreneurial-minded students.",
    link: "https://dubhacks.com",
  },
  {
    date: "Mar 2024 - Present",
    title: "Software Developer",
    company: "University of Washington",
    description: "In March 2024, I began as a Software Developer at SEAL at the University of Washington.",
    link: "https://www.uwseal.org/",
  },
  {
    date: "Mar 2024 - Nov 2024",
    title: "Machine Learning Research Assistant",
    company: "University of Washington",
    description:
      "Started in March 2024 as a Research Assistant at DAIS at the University of Washington where I research machine learning protein modeling.",
    link: "https://sites.google.com/uw.edu/dais-uw",
  },
  {
    date: "June 2023 - Aug 2023",
    title: "Software Engineer Intern",
    company: "Datascience9",
    description:
      "Worked mainly on the backend at Datascience9 as a Software Engineering Intern during Summer 2023",
    link: "https://datascience9.com",
  },
  {
    date: "August 2018 - Present",
    title: "Youth Soccer Referee",
    company: "U.S. Soccer Federation",
    description: "In August 2018, I began refereeing youth soccer games for the U.S. Soccer Federation.",
    link: "https://www.ussoccer.com",
  },
]

function useThresholds(count: number) {
  return useMemo(() => {
    const start = 0.1
    const end = 0.9
    const step = (end - start) / Math.max(1, count - 1)
    return new Array(count).fill(0).map((_, i) => start + i * step)
  }, [count])
}

const TimelineScene: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })

  const thresholds = useThresholds(EXPERIENCES.length)

  // Active experience index driven by scroll progress (closest threshold)
  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let closestIndex = 0
    let closestDist = Math.abs(v - thresholds[0])
    for (let i = 1; i < thresholds.length; i += 1) {
      const dist = Math.abs(v - thresholds[i])
      if (dist < closestDist) {
        closestDist = dist
        closestIndex = i
      }
    }
    setActiveIndex(closestIndex)
  })

  // Camera motion - zoomed out view with gentle vertical movement
  const cameraX = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
  const cameraY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"])
  const cameraScale = useTransform(scrollYProgress, [0, 1], [0.6, 0.8])

  return (
    <section ref={wrapperRef} className="relative h-[500vh] bg-gray-950" id="timeline">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Right-side scene */}
        <motion.div style={{ x: cameraX, y: cameraY, scale: cameraScale }} className="absolute inset-0">
          <svg className="w-[160vw] h-[250vh]" viewBox="0 0 1600 2500">
            <defs>
              <linearGradient id="trail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d="M800,150 C650,400 950,650 800,900 C650,1150 950,1400 800,1650 C650,1900 950,2150 800,2400"
              stroke="url(#trail)"
              strokeWidth="8"
              filter="url(#glow)"
              fill="none"
              style={{ pathLength: scrollYProgress }}
              strokeLinecap="round"
            />

            {thresholds.map((t, i) => (
              <motion.circle
                key={i}
                r={12}
                cx={800}
                cy={150 + i * 350}
                fill="#93c5fd"
                style={{ opacity: useTransform(scrollYProgress, [t - 0.03, t, t + 0.03], [0.2, 1, 0.4]) }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Left-side pinned panel with active experience */}
        <div className="absolute inset-y-0 left-0 z-20 w-full md:w-[38%] px-4 md:px-8 py-6 md:py-10 pointer-events-none">
          <div className="sticky top-24">
            <div className="mb-5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">Experience</div>
            </div>

            <div className="pointer-events-auto">
              <div className="p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/30 to-purple-500/30">
                <div className="rounded-2xl bg-gray-900/80 backdrop-blur-md p-5 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                  <div className="text-sm text-blue-200">{EXPERIENCES[activeIndex].date}</div>
                  <div className="mt-1 text-2xl md:text-3xl font-semibold leading-tight">{EXPERIENCES[activeIndex].title}</div>
                  <div className="text-blue-300 text-sm">{EXPERIENCES[activeIndex].company}</div>
                  <p className="mt-3 text-[15px] text-white/80 leading-relaxed">{EXPERIENCES[activeIndex].description}</p>
                  {EXPERIENCES[activeIndex].link && (
                    <div className="mt-4">
                      <a
                        href={EXPERIENCES[activeIndex].link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
                      >
                        Learn more →
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress pills */}
              <div className="mt-5 flex flex-col gap-2">
                {EXPERIENCES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "bg-gradient-to-r from-blue-400 to-purple-400 w-24" : "bg-white/10 w-12"
                    }`}
                  />)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineScene