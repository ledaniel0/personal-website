"use client"
import { useEffect } from "react"
import type React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const Hero: React.FC = () => {
  const router = useRouter()

  const handleExploreClick = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/#projects")
    }
  }

  const createGradientAnimation = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    let gradient
    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 200 // Adjust height as needed
      gradient = ctx!.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "#3b82f6")
      gradient.addColorStop(0.5, "#8b5cf6")
      gradient.addColorStop(1, "#3b82f6")
    }

    const animate = (t: number) => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height)
      gradient!.addColorStop(0, `hsl(${(t * 0.1) % 360}, 70%, 60%)`)
      gradient!.addColorStop(0.5, `hsl(${(t * 0.1 + 120) % 360}, 70%, 60%)`)
      gradient!.addColorStop(1, `hsl(${(t * 0.1 + 240) % 360}, 70%, 60%)`)
      ctx!.fillStyle = gradient!
      ctx!.fillRect(0, 0, canvas.width, canvas.height)
      animationFrameId = requestAnimationFrame(() => animate(t + 1))
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }

  useEffect(() => {
    const cleanup = createGradientAnimation()
    return cleanup
  }, [])

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <motion.div
        className="relative h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500"
            style={{ backgroundSize: "200% 200%", animation: "gradient 15s ease infinite" }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Daniel Le
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            cs student @ the university of washington
          </motion.p>

        </div>
      </motion.div>
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

export default Hero

