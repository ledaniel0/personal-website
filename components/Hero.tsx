// "use client"
// import { useEffect, useRef, useState } from "react"
// import type React from "react"
// import { motion, useScroll, useTransform, useSpring } from "framer-motion"
// import { useRouter } from "next/navigation"
// import { Github, Linkedin, Instagram } from "lucide-react"

// const Hero: React.FC = () => {
//   const router = useRouter()
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
//   const [windowSize, setWindowSize] = useState({
//     width: typeof window !== "undefined" ? window.innerWidth : 1200,
//     height: typeof window !== "undefined" ? window.innerHeight : 800,
//   })

//   // Parallax effect for background elements
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   })

//   const handleExploreClick = () => {
//     const projectsSection = document.getElementById("projects")
//     if (projectsSection) {
//       projectsSection.scrollIntoView({ behavior: "smooth" })
//     } else {
//       router.push("/#projects")
//     }
//   }

//   const createGradientAnimation = () => {
//     const canvas = document.createElement("canvas")
//     const ctx = canvas.getContext("2d")
//     let gradient
//     let animationFrameId: number

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth
//       canvas.height = 200 // Adjust height as needed
//       gradient = ctx!.createLinearGradient(0, 0, canvas.width, 0)
//       gradient.addColorStop(0, "#3b82f6")
//       gradient.addColorStop(0.5, "#8b5cf6")
//       gradient.addColorStop(1, "#3b82f6")
//     }

//     const animate = (t: number) => {
//       ctx!.clearRect(0, 0, canvas.width, canvas.height)
//       gradient!.addColorStop(0, `hsl(${(t * 0.1) % 360}, 70%, 60%)`)
//       gradient!.addColorStop(0.5, `hsl(${(t * 0.1 + 120) % 360}, 70%, 60%)`)
//       gradient!.addColorStop(1, `hsl(${(t * 0.1 + 240) % 360}, 70%, 60%)`)
//       ctx!.fillStyle = gradient!
//       ctx!.fillRect(0, 0, canvas.width, canvas.height)
//       animationFrameId = requestAnimationFrame(() => animate(t + 1))
//     }

//     resizeCanvas()
//     window.addEventListener("resize", resizeCanvas)
//     animate(0)

//     return () => {
//       window.removeEventListener("resize", resizeCanvas)
//       cancelAnimationFrame(animationFrameId)
//     }
//   }

//   useEffect(() => {
//     const cleanup = createGradientAnimation()
//     return cleanup
//   }, [createGradientAnimation])

//   return (
//     <div className="relative h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
//       <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
//       <motion.div
//         className="relative h-full flex items-center justify-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <div className="text-center px-4">
//           <motion.h1
//             className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500"
//             style={{ backgroundSize: "200% 200%", animation: "gradient 15s ease infinite" }}
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           >
//             Daniel Le
//           </motion.h1>
//           <motion.p
//             className="text-xl md:text-2xl mb-8 text-gray-300"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//           >
//             cs student @ the university of washington
//           </motion.p>
//           <motion.div
//             className="flex justify-center space-x-4 mt-8"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           >
//             <a
//               href="https://github.com/ledaniel0"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-blue-400 transition-colors duration-300"
//             >
//               <Github size={24} />
//             </a>
//             <a
//               href="https://www.linkedin.com/in/daniel-le2323755/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-blue-400 transition-colors duration-300"
//             >
//               <Linkedin size={24} />
//             </a>
//             <a
//               href="https://www.instagram.com/le_.daniel/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-blue-400 transition-colors duration-300"
//             >
//               <Instagram size={24} />
//             </a>
//           </motion.div>
//         </div>
//       </motion.div>
//       <style jsx>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Hero

"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRouter } from "next/navigation"
import { Github, Linkedin, Instagram, ChevronDown } from "lucide-react"

const Hero: React.FC = () => {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  // Parallax effect for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Interactive gradient background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      setMousePosition({
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight,
      })
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Smooth scroll to projects section
  const handleExploreClick = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/#projects")
    }
  }

  // Spring animations for social icons
  const springConfig = { stiffness: 300, damping: 20 }
  const githubScale = useSpring(1, springConfig)
  const linkedinScale = useSpring(1, springConfig)
  const instagramScale = useSpring(1, springConfig)

  // Generate random positions for particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * windowSize.width,
    initialY: Math.random() * windowSize.height,
    opacity: Math.random() * 0.5 + 0.3,
    duration: 10 + Math.random() * 20,
    positions: [
      [Math.random() * windowSize.width, Math.random() * windowSize.height],
      [Math.random() * windowSize.width, Math.random() * windowSize.height],
      [Math.random() * windowSize.width, Math.random() * windowSize.height],
    ],
  }))

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(30, 41, 59, 0.8))`,
        backgroundSize: "200% 200%",
      }}
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center"
        style={{
          opacity: 0.2,
          y,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-blue-400"
            initial={{
              x: particle.initialX,
              y: particle.initialY,
              opacity: particle.opacity,
            }}
            animate={{
              x: [particle.positions[0][0], particle.positions[1][0], particle.positions[2][0]],
              y: [particle.positions[0][1], particle.positions[1][1], particle.positions[2][1]],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative h-full flex items-center justify-center"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center px-4 z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500"
            style={{ backgroundSize: "200% 200%" }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            Daniel Le
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              type: "spring",
            }}
          >
            cs student @ the university of washington
          </motion.p>

          <motion.div
            className="flex justify-center space-x-8 mt-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="https://github.com/ledaniel0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors duration-300"
              onHoverStart={() => githubScale.set(1.3)}
              onHoverEnd={() => githubScale.set(1)}
              style={{ scale: githubScale }}
            >
              <Github size={28} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/daniel-le2323755/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors duration-300"
              onHoverStart={() => linkedinScale.set(1.3)}
              onHoverEnd={() => linkedinScale.set(1)}
              style={{ scale: linkedinScale }}
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/le_.daniel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors duration-300"
              onHoverStart={() => instagramScale.set(1.3)}
              onHoverEnd={() => instagramScale.set(1)}
              style={{ scale: instagramScale }}
            >
              <Instagram size={28} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        onClick={handleExploreClick}
      >
        <ChevronDown className="text-white w-8 h-8" />
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

