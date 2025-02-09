import type { Metadata } from "next"
import { Montserrat, Lora, Hind_Madurai } from "next/font/google"
import "./globals.css"
import type React from "react"
import { Analytics } from "@vercel/analytics/react"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-lora",
})

const hindMadurai = Hind_Madurai({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind",
})

export const metadata: Metadata = {
  title: "Virtual Donald Trump Museum",
  description: "Experience the legacy of the 45th President of the United States",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://blockonomics.co/js/pay_widget.js" async defer />
      </head>
      <body className={`${montserrat.variable} ${lora.variable} ${hindMadurai.variable}`}>
        <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-hind transition-colors">
          {children}
        </div>
        <script src="https://www.blockonomics.co/js/pay_button.js" />
        <Analytics />
      </body>
    </html>
  )
}

