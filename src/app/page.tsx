"use client"

import Header from "./components/header"
import DonateButton from "./components/donate-button"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import AnimatedSection from "./components/animated-section"
import AnimatedCard from "./components/animated-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-yellow-600 dark:text-yellow-500 font-montserrat tracking-tight"
          >
            Virtual Donald Trump Museum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl mb-8 text-gray-700 dark:text-gray-300 font-lora max-w-3xl mx-auto"
          >
            Experience the legacy of the 45th President of the United States in stunning virtual reality
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center space-y-6"
          >
            <Link href="/download" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white text-lg sm:text-xl py-6 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <Download className="mr-3 h-6 w-6" /> Download VR App
              </Button>
            </Link>
            <p className="text-sm text-gray-600">Available for Windows PC with VR Support</p>
          </motion.div>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Interactive Exhibits",
              description: "Walk through meticulously crafted virtual exhibits showcasing key moments of the Trump presidency."
            },
            {
              title: "VR Experience",
              description: "Immerse yourself in historical moments with cutting-edge virtual reality technology."
            },
            {
              title: "Historical Archives",
              description: "Access a comprehensive collection of documents, speeches, and media from the Trump era."
            }
          ].map((feature, index) => (
            <AnimatedCard key={feature.title} delay={index * 0.2}>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-600 dark:text-yellow-500 font-montserrat">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-hind">
                  {feature.description}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Support Section */}
        <AnimatedSection delay={0.6} direction="up" className="mb-16">
          <section className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-yellow-600 dark:text-yellow-500 font-montserrat">
              Support Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto font-hind">
              Help us preserve and present this important period in American history. Your support enables us to continue
              developing and maintaining this virtual museum experience.
            </p>
            <div className="flex justify-center">
              <DonateButton />
            </div>
          </section>
        </AnimatedSection>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { number: "1,000+", label: "Virtual Artifacts" },
            { number: "50+", label: "Interactive Exhibits" },
            { number: "24/7", label: "Global Access" }
          ].map((stat, index) => (
            <AnimatedCard key={stat.label} delay={0.8 + index * 0.2}>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500 font-montserrat mb-2">
                  {stat.number}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 font-hind">
                  {stat.label}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </main>
    </div>
  )
}

