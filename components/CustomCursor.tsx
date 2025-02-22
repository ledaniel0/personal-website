"use client"

import type React from "react"
import { useEffect, useState } from "react"

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateCursorPosition)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
    }
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-4 h-4 bg-blue-500 rounded-full opacity-50" />
      <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1" />
    </div>
  )
}

export default CustomCursor

