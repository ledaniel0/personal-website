"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 120, // Increased default speed for slower typing
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (delay > 0 && !isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(timeout)
    }

    if (!isTyping) return

    if (currentIndex < text.length) {
      // Add random variation to typing speed for more natural effect
      const randomVariation = Math.random() * 100 - 50 // -50 to +50ms variation
      const adjustedSpeed = Math.max(50, speed + randomVariation)

      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, adjustedSpeed)
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, isTyping, speed, text])

  return (
    <span className={className}>
      {displayedText}
      {isTyping && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          className="inline-block w-0.5 h-5 bg-blue-400 ml-0.5"
        />
      )}
    </span>
  )
}

export default TypewriterText

