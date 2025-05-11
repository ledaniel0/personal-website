"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  minimumDisplayTime?: number
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ minimumDisplayTime = 2500 }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false)
  const [documentLoaded, setDocumentLoaded] = useState(false)
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isPaused = useRef(false)
  const reachedEndRef = useRef(false)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate realistic loading with random pauses
  useEffect(() => {
    // Ensure minimum display time
    const timer = setTimeout(() => {
      setMinimumTimeElapsed(true)
    }, minimumDisplayTime)

    // Start with a small delay
    setTimeout(() => {
      // Simulate progress with random pauses
      const simulateProgress = () => {
        if (isPaused.current || reachedEndRef.current) return

        setProgress((prev) => {
          // If document is loaded and we're close to 100%, accelerate to finish
          if (documentLoaded && prev > 85) {
            const newProgress = Math.min(prev + 2, 99.9)

            // If we're very close to 100%, finish in one go to avoid visual glitches
            if (newProgress > 99) {
              // Schedule the final jump to 100% after a short delay
              if (!reachedEndRef.current) {
                reachedEndRef.current = true
                setTimeout(() => {
                  setProgress(100)

                  // Clear the interval once we've reached 100%
                  if (loadingIntervalRef.current) {
                    clearInterval(loadingIntervalRef.current)
                  }
                }, 200)
              }
              return newProgress
            }

            return newProgress
          }

          // If we're at 99% and document isn't loaded, stay there
          if (prev >= 99 && !documentLoaded) {
            return 99
          }

          // Normal progress calculation with slowdown as we approach higher percentages
          let increment
          if (prev < 30) increment = Math.random() * 3 + 1
          else if (prev < 60) increment = Math.random() * 2 + 0.5
          else if (prev < 85) increment = Math.random() * 1 + 0.2
          else increment = Math.random() * 0.5 + 0.1

          // Cap progress based on document load state
          return Math.min(prev + increment, documentLoaded ? 99.9 : 99)
        })

        // Random chance to pause (more likely at higher percentages)
        const pauseChance = progress > 70 ? 0.15 : 0.08
        if (Math.random() < pauseChance && progress > 20 && progress < 90) {
          isPaused.current = true

          // Pause for a random duration
          pauseTimeoutRef.current = setTimeout(
            () => {
              isPaused.current = false
            },
            Math.random() * 800 + 200,
          )
        }
      }

      loadingIntervalRef.current = setInterval(simulateProgress, 100)
    }, 300)

    // Check if document is loaded
    const handleLoad = () => {
      setDocumentLoaded(true)

      // When document is loaded, ensure we're at least at 85%
      setProgress((prev) => Math.max(prev, 85))
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      clearTimeout(timer)
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      window.removeEventListener("load", handleLoad)
    }
  }, [minimumDisplayTime, progress, documentLoaded])

  // Hide loading screen when both conditions are met
  useEffect(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }

    if ((minimumTimeElapsed && progress >= 100) || (progress >= 100 && documentLoaded)) {
      // Use a ref for the timeout to ensure we can clear it if needed
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 400) // Slightly longer delay to ensure smooth transition
    }
  }, [minimumTimeElapsed, progress, documentLoaded])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative mb-8"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500">
              loading
            </div>
          </motion.div>

          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.div
            className="mt-4 text-gray-400 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen

