"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const GlobalParticles: React.FC = () => {
  const [pageHeight, setPageHeight] = useState(3000)
  const [windowWidth, setWindowWidth] = useState(1200)

  const { scrollY } = useScroll()

  // Update page dimensions
  useEffect(() => {
    const updateSize = () => {
      setPageHeight(document.documentElement.scrollHeight)
      setWindowWidth(window.innerWidth)
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    
    // Update when content loads/changes
    const observer = new MutationObserver(updateSize)
    observer.observe(document.body, { childList: true, subtree: true })

    // Delay update to ensure content is rendered
    setTimeout(updateSize, 100)
    setTimeout(updateSize, 500)
    setTimeout(updateSize, 1000)

    return () => {
      window.removeEventListener("resize", updateSize)
      observer.disconnect()
    }
  }, [])

  // Generate three layers of particles with different parallax speeds
  const particleLayers = useMemo(() => {
    const layers = [
      { speed: 0.3, count: 25, size: 7, opacity: 0.2 }, // Far layer - slow
      { speed: 0.6, count: 20, size: 7, opacity: 0.25 },   // Mid layer - medium
      { speed: 0.9, count: 15, size: 7, opacity: 0.3 },  // Near layer - fast
    ]

    return layers.map((layer, layerIndex) => ({
      layerIndex,
      speed: layer.speed,
      particles: Array.from({ length: layer.count }).map((_, i) => {
        const centerX = Math.random() * windowWidth
        const centerY = Math.random() * pageHeight
        const radius = 50 + Math.random() * 80 // Increased from 30-70 to 50-130px orbit
        const duration = 20 + Math.random() * 20 // Decreased from 35-60 to 20-40 seconds (faster)
        const startAngle = Math.random() * Math.PI * 2
        
        return {
          id: `${layerIndex}-${i}`,
          centerX,
          centerY,
          radius,
          duration,
          startAngle,
          size: layer.size,
          opacity: Math.random() * 0.15 + layer.opacity,
        }
      })
    }))
  }, [windowWidth, pageHeight])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={{ height: pageHeight }}>
      {particleLayers.map((layer) => (
        <div key={layer.layerIndex}>
          {layer.particles.map((particle) => {
            // Create parallax effect: particle moves at different speed than scroll
            const y = useTransform(
              scrollY,
              [0, pageHeight],
              [0, -pageHeight * (1 - layer.speed)]
            )

            return (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-blue-400"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: particle.centerX,
                  top: particle.centerY,
                  opacity: particle.opacity,
                  y,
                }}
                animate={{
                  x: [
                    particle.radius * Math.cos(particle.startAngle),
                    particle.radius * Math.cos(particle.startAngle + Math.PI / 2),
                    particle.radius * Math.cos(particle.startAngle + Math.PI),
                    particle.radius * Math.cos(particle.startAngle + 3 * Math.PI / 2),
                    particle.radius * Math.cos(particle.startAngle + 2 * Math.PI),
                  ],
                  x2: [
                    particle.radius * Math.sin(particle.startAngle),
                    particle.radius * Math.sin(particle.startAngle + Math.PI / 2),
                    particle.radius * Math.sin(particle.startAngle + Math.PI),
                    particle.radius * Math.sin(particle.startAngle + 3 * Math.PI / 2),
                    particle.radius * Math.sin(particle.startAngle + 2 * Math.PI),
                  ],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default GlobalParticles
