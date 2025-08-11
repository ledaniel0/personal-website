import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import CustomCursor from "@/components/CustomCursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "personal website",
  description:
    "daniel le's personal website",
    // generator: 'v0.dev'
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
// duplicate globals import removed
