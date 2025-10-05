"use client"

import type React from "react"
import { useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { prefersReducedMotion } from "@/lib/motion"

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
    description: "Software Development Engineer Intern at Amazon on the Worldwide Returns & ReCommerce team in Fall of 2025 in Bellevue, WA.",
    link: "https://www.amazon.com/",
  },
  {
    date: "June 2025 - Sep 2025",
    title: "Software Engineer Intern",
    company: "Salesforce",
    description: "Software Engineer Intern at Salesforce on the Metadata Services Team in the Data Cloud org in Summer of 2025 in Bellevue, WA.",
    link: "https://www.salesforce.com/",
  },
  {
    date: "Dec 2024 - June 2025",
    title: "Fellow",
    company: "DubHacks Next",
    description:
      "Selected to a UW startup incubator program where I am a part of a cohort of entrepreneurial-minded students.",
    link: "https://dubhacks.com",
  },
  {
    date: "Mar 2024 - May 2025",
    title: "Software Developer",
    company: "Sensors, Energy, and Automation Lab",
    description: "In March 2024, I began as a Software Developer at SEAL at the University of Washington.",
    link: "https://www.uwseal.org/",
  },
  {
    date: "Mar 2024 - Nov 2024",
    title: "Machine Learning Research Assistant",
    company: "Data Analysis & Intelligent Systems Lab",
    description:
      "Started in March 2024 as a Research Assistant at DAIS at the University of Washington where I optimized protein modeling ML models.",
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

  // Camera motion - zoomed out view with controlled vertical pan across entire scene height
  const cameraScale = useTransform(scrollYProgress, [0, 1], [0.8, 0.8])
  // Pan the scene by the extra height beyond the viewport: 250vh - 100vh = 150vh
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0vh", "-150vh"])
  // Horizontal offset to move timeline left
  const sceneX = "-5vw" // Adjust this value: more negative = further left 

  return (
    <section ref={wrapperRef} className="relative h-[500vh] bg-gray-950" id="timeline">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Right-side scene */}
        <div className="absolute inset-0">
          <motion.svg className="w-[160vw] h-[250vh]" viewBox="0 0 1600 2500" style={{ x: sceneX, y: sceneY, scale: cameraScale }}>
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
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="nodeGradient" cx="0.3" cy="0.3" r="0.8">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9" />
              </radialGradient>
              <radialGradient id="nodeRing" cx="0.5" cy="0.5" r="1">
                <stop offset="70%" stopColor="transparent" />
                <stop offset="85%" stopColor="#60a5fa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            <motion.path
              d="M800,150 C650,400 950,650 800,900 C650,1150 950,1400 800,1650 C650,1900 950,2150 800,2400"
              stroke="url(#trail)"
              strokeWidth="8"
              filter="url(#glow)"
              fill="none"
              style={{ pathLength: prefersReducedMotion() ? 1 : scrollYProgress }}
              strokeLinecap="round"
            />

            {thresholds.map((t, i) => {
              const isActive = useTransform(scrollYProgress, [t - 0.05, t, t + 0.05], [0, 1, 0])
              const nodeScale = useTransform(scrollYProgress, [t - 0.03, t, t + 0.03], [0.8, 1.2, 1])
              
              return (
                <g key={i}>
                  {/* Outer ring for active state */}
                  <motion.circle
                    r={24}
                    cx={800}
                    cy={140 + i * 380}
                    fill="url(#nodeRing)"
                    style={{ 
                      opacity: useTransform(scrollYProgress, [t - 0.03, t, t + 0.03], [0, 0.8, 0]),
                      scale: useTransform(scrollYProgress, [t - 0.03, t, t + 0.03], [0.5, 1, 0.5])
                    }}
                  />
                  
                  {/* Main node */}
                  <motion.circle
                    r={16}
                    cx={800}
                    cy={140 + i * 380}
                    fill="url(#nodeGradient)"
                    filter="url(#nodeGlow)"
                    style={{ 
                      opacity: useTransform(scrollYProgress, [t - 0.03, t, t + 0.03], [0.3, 1, 0.6]),
                      scale: nodeScale
                    }}
                  />
                  
                  {/* Inner highlight */}
                  <motion.circle
                    r={6}
                    cx={794}
                    cy={134 + i * 380}
                    fill="#ffffff"
                    style={{ 
                      opacity: useTransform(scrollYProgress, [t - 0.03, t, t + 0.03], [0.1, 0.7, 0.3]),
                      scale: nodeScale
                    }}
                  />
                  
                  {/* Pulse effect */}
                  <motion.circle
                    r={16}
                    cx={800}
                    cy={140 + i * 380}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                    style={{ 
                      opacity: useTransform(scrollYProgress, [t - 0.03, t, t + 0.03], [0, 1, 0]),
                      scale: useTransform(scrollYProgress, [t - 0.02, t + 0.02], [1, 2.5])
                    }}
                  />
                  
                  <motion.text
                    x={830}
                    y={140 + i * 380 + 8}
                    className="fill-white/90 text-lg font-semibold"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ 
                      opacity: useTransform(scrollYProgress, [t - 0.05, t, t + 0.1], [0.4, 1, 0.7])
                    }}
                  >
                    {EXPERIENCES[i].company}
                  </motion.text>
                </g>
              )
            })}
          </motion.svg>
        </div>

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