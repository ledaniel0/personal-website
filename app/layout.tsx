import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import CustomCursor from "@/components/CustomCursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Daniel Le Personal Website",
  description:
    "Explore the projects and skills of Daniel Le, a software engineer specializing in full-stack development, machine learning, and cloud technologies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}



import './globals.css'