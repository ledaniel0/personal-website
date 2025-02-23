"use client"

import { useEffect } from "react"
import Hero from "@/components/Hero"
import Timeline from "@/components/Timeline"
import ProjectsShowcase from "@/components/ProjectsShowcase"
import SkillTree from "@/components/SkillTree"
import ContactForm from "@/components/ContactForm"
import FloatingNav from "@/components/FloatingNav"

export default function Home() {
  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const targetId = target.getAttribute("href")
      if (targetId) {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", smoothScroll)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", smoothScroll)
      })
    }
  }, [])

  return (
    <main>
      <section id="hero">
        <Hero />
      </section>
      <section id="timeline">
        <Timeline />
      </section>
      <section id="projects">
        <ProjectsShowcase />
      </section>
      {/* <section id="skills">
        <SkillTree />
      </section> */}
      <section id="contact">
        <ContactForm />
      </section>
      <FloatingNav />
    </main>
  )
}

