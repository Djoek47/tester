"use client"

import { motion } from "framer-motion"
import Header from "../components/header"
import AnimatedSection from "../components/animated-section"
import AnimatedCard from "../components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"
import Image from 'next/image'

const exhibits = {
  presidency: [
    {
      title: "The Road to the White House",
      description: "Follow Trump's journey from businessman to the 45th President.",
      image: "/placeholder.svg"
    },
    {
      title: "First 100 Days",
      description: "Key decisions and executive orders that shaped the presidency.",
      image: "/placeholder.svg"
    }
  ],
  policies: [
    {
      title: "America First Foreign Policy",
      description: "Examining international relations and trade agreements.",
      image: "/placeholder.svg"
    },
    {
      title: "Economic Initiatives",
      description: "Tax reforms and economic policies of the administration.",
      image: "/placeholder.svg"
    }
  ],
  legacy: [
    {
      title: "Media Relations",
      description: "The dynamic between the presidency and the press.",
      image: "/placeholder.svg"
    },
    {
      title: "Historical Impact",
      description: "Analyzing the lasting effects on American politics.",
      image: "/placeholder.svg"
    }
  ]
}

export default function Exhibits() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AnimatedSection className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-4 text-yellow-600 dark:text-yellow-500 font-montserrat"
          >
            Virtual Exhibits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-6 text-gray-700 dark:text-gray-300 font-lora"
          >
            Experience history in immersive VR
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/download">
              <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white text-lg py-4 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                <Download className="mr-2 h-5 w-5" /> Download VR App
              </Button>
            </Link>
          </motion.div>
        </AnimatedSection>

        <div className="space-y-16">
          {/* Presidency Section */}
          <AnimatedSection delay={0.2}>
            <h2 className="text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-500 font-montserrat">
              The Presidency
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {exhibits.presidency.map((exhibit, index) => (
                <AnimatedCard key={index} delay={0.4 + index * 0.2}>
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat text-gray-800 dark:text-gray-100">
                      {exhibit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image 
                      src={exhibit.image} 
                      alt={exhibit.title} 
                      className="w-full h-48 object-cover mb-4 rounded-md shadow-md dark:shadow-gray-900/30" 
                      width={500}
                      height={300}
                    />
                    <CardDescription className="font-hind text-lg text-gray-600 dark:text-gray-300">
                      {exhibit.description}
                    </CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>

          {/* Policies Section */}
          <AnimatedSection delay={0.6}>
            <h2 className="text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-500 font-montserrat">
              Key Policies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {exhibits.policies.map((exhibit, index) => (
                <AnimatedCard key={index} delay={0.8 + index * 0.2}>
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat text-gray-800 dark:text-gray-100">
                      {exhibit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image 
                      src={exhibit.image} 
                      alt={exhibit.title} 
                      className="w-full h-48 object-cover mb-4 rounded-md shadow-md dark:shadow-gray-900/30" 
                      width={500}
                      height={300}
                    />
                    <CardDescription className="font-hind text-lg text-gray-600 dark:text-gray-300">
                      {exhibit.description}
                    </CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>

          {/* Legacy Section */}
          <AnimatedSection delay={1.0}>
            <h2 className="text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-500 font-montserrat">
              Historical Legacy
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {exhibits.legacy.map((exhibit, index) => (
                <AnimatedCard key={index} delay={1.2 + index * 0.2}>
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat text-gray-800 dark:text-gray-100">
                      {exhibit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image 
                      src={exhibit.image} 
                      alt={exhibit.title} 
                      className="w-full h-48 object-cover mb-4 rounded-md shadow-md dark:shadow-gray-900/30" 
                      width={500}
                      height={300}
                    />
                    <CardDescription className="font-hind text-lg text-gray-600 dark:text-gray-300">
                      {exhibit.description}
                    </CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  )
}

