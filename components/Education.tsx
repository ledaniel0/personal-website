"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "376A5487.jpg",
  "12D28B00-0DF8-4691-8625-B1619D1690F0.jpg",
  "IMG_0118.JPG",
  "IMG_0220.jpg",
  "IMG_1689.jpg",
  "IMG_3865.JPG",
  "IMG_4627.PNG",
  "IMG_5454.JPG",
  "IMG_7478.PNG",
  "IMG_7736.PNG",
  "RenderedImage.jpg",
]

export default function Education() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [[imageIndex, direction], setImageIndex] = useState([0, 0])

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(newIndex)
    setImageIndex([newIndex, -1])
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
    setImageIndex([newIndex, 1])
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
    setImageIndex([index, index > currentIndex ? 1 : -1])
  }

  return (
    <section id="education" className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <motion.div
            className="text-xs uppercase tracking-[0.2em] text-white/80 font-medium"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            Education
          </motion.div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Education Info */}
          <div className="space-y-4">
            {/* University Block - Larger */}
            <motion.div 
              className="block py-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start gap-5">
                {/* University Logo - Larger */}
                <div className="flex-shrink-0 w-28 h-28 relative">
                  <Image
                    src="uwseal.png"
                    alt="University of Washington Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* University Info */}
                <div className="flex-1 pt-2">
                  <div className="text-sm text-theme-text-tertiary mb-2">2023 - 2027</div>
                  <h3 className="text-2xl font-semibold mb-1.5">University of Washington</h3>
                  <p className="text-base text-theme-text-secondary mb-3">BS Computer Science</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-theme-accent-purple">Junior</span>
                    <span className="text-sm text-theme-text-tertiary">•</span>
                    <span className="text-sm text-theme-text-secondary">Seattle, WA</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* High School Block - Larger */}
            <motion.div 
              className="block py-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-start gap-5">
                {/* High School Logo - Larger */}
                <div className="flex-shrink-0 w-24 h-24 relative">
                  <Image
                    src="kamiakseal.png"
                    alt="Kamiak High School Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* High School Info */}
                <div className="flex-1 pt-2">
                  <div className="text-sm text-theme-text-tertiary mb-2">2019 - 2023</div>
                  <div className="text-xl font-semibold mb-1">Kamiak High School</div>
                  <p className="text-sm text-theme-text-secondary">Mukilteo, WA</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Slideshow */}
          <motion.div 
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-theme-border-subtle group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={imageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.4, ease: "easeInOut" }
                  }}
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
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
                  onClick={() => goToIndex(index)}
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
