"use client"

import type React from "react"
import { motion } from "framer-motion"

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description, align = "center" }) => {
  const isCenter = align === "center"
  return (
    <div className={`mb-12 ${isCenter ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <motion.div
          className="text-xs uppercase tracking-wider text-theme-text-tertiary mb-2"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.3 }}
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        className="text-3xl md:text-4xl font-semibold text-theme-text-primary mb-3"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`text-theme-text-secondary text-base ${isCenter ? "mx-auto max-w-2xl" : ""}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeader

