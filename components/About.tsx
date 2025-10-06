"use client"

import type React from "react"
import { useState } from "react"
import SectionHeader from "./SectionHeader"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "/376A5487.jpg",
  "/12D28B00-0DF8-4691-8625-B1619D1690F0.jpg",
  "/IMG_0118.JPG",
  "/IMG_0220.jpg",
  "/IMG_1689.jpg",
  "/IMG_3865.JPG",
  "/IMG_4627.PNG",
  "/IMG_5454.JPG",
  "/IMG_7478.PNG",
  "/IMG_7736.PNG",
  "/RenderedImage.jpg",
]

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="About"
          title="A bit about me"
          description="CS @ UW. I build applied AI products and delightful developer experiences. Previously at Salesforce and Amazon."
        />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text content */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-gray-800/60 p-5">
                <div className="text-white/60 text-sm">Focus</div>
                <div className="mt-2 text-white">Systems, ML tooling, product engineering</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gray-800/60 p-5">
                <div className="text-white/60 text-sm">Tooling</div>
                <div className="mt-2 text-white">TypeScript, Python, AWS, React</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gray-800/60 p-5">
                <div className="text-white/60 text-sm">Interests</div>
                <div className="mt-2 text-white">Infra, AI agents, data viz</div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              I'm passionate about building tools that empower developers and creating products that solve real problems.
              Currently exploring the intersection of AI and developer productivity.
            </p>
          </div>
          
          {/* Slideshow */}
          <motion.div 
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0">
              <Image
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentIndex === 0}
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}