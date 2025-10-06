"use client"
import Hero from "@/components/Hero"
import TimelineScene from "@/components/TimelineScene"
import ProjectsShowcase from "@/components/ProjectsShowcase"
import TopNav from "@/components/TopNav"
import Education from "@/components/Education"

export default function Home() {
  return (
    <main className="relative z-10">
      <TopNav />
      <section id="hero">
        <Hero />
      </section>
      <Education />
      <TimelineScene />
      <ProjectsShowcase />
      {/* Contact section removed */}
    </main>
  )
}