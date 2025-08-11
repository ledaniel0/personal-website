"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isTouch, setIsTouch] = useState(false)

  // Immediate cursor position
  const targetXRef = useRef(0)
  const targetYRef = useRef(0)

  // Smoothed ring position
  const ringXRef = useRef(0)
  const ringYRef = useRef(0)
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 })

  const rafRef = useRef<number | null>(null)
  const inactivityTimerRef = useRef<number | null>(null)

  useEffect(() => {
    // Hide on touch devices
    const onTouchStart = () => setIsTouch(true)
    window.addEventListener("touchstart", onTouchStart, { once: true })

    const updateCursorPosition = (e: MouseEvent) => {
      targetXRef.current = e.clientX
      targetYRef.current = e.clientY
      setIsVisible(true)

      if (inactivityTimerRef.current) cancelAnimationFrame(inactivityTimerRef.current)
      // Hide after 2s of inactivity
      inactivityTimerRef.current = window.setTimeout(() => setIsVisible(false), 2000) as unknown as number
    }

    window.addEventListener("mousemove", updateCursorPosition)

    const animate = () => {
      // Lerp ring towards target for smooth trailing motion
      const lerpFactor = 0.12
      ringXRef.current = ringXRef.current + (targetXRef.current - ringXRef.current) * lerpFactor
      ringYRef.current = ringYRef.current + (targetYRef.current - ringYRef.current) * lerpFactor
      setRingPos({ x: ringXRef.current, y: ringYRef.current })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (inactivityTimerRef.current) cancelAnimationFrame(inactivityTimerRef.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {/* Center dot */}
      <div
        style={{
          transform: `translate(${targetXRef.current - 2}px, ${targetYRef.current - 2}px)`,
          opacity: isVisible ? 0.9 : 0,
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-300"
      />
      {/* Trailing ring */}
      <div
        style={{
          transform: `translate(${ringPos.x - 12}px, ${ringPos.y - 12}px)`,
          opacity: isVisible ? 0.35 : 0,
        }}
        className="absolute w-6 h-6 rounded-full border border-white/60"
      />
    </div>
  )
}

export default CustomCursor

