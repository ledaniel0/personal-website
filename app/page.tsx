"use client"
import Hero from "@/components/Hero"
import TimelineScene from "@/components/TimelineScene"
import ProjectsShowcase from "@/components/ProjectsShowcase"
import TopNav from "@/components/TopNav"
import About from "@/components/About"

export default function Home() {
  return (
    <main>
      <TopNav />
      <section id="hero">
        <Hero />
      </section>
      <About />
      <TimelineScene />
      <section id="projects">
        <ProjectsShowcase />
      </section>
      {/* Contact section removed */}
    </main>
  )
}

