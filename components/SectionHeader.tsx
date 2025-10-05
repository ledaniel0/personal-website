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
    <div className={`${isCenter ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <motion.div
          className="text-[11px] uppercase tracking-[0.2em] text-white/60"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.3 }}
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl font-bold mt-2"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`mt-3 text-white/70 ${isCenter ? "mx-auto max-w-2xl" : ""}`}
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

