"use client"

import { motion } from "framer-motion"
import Header from "../components/header"
import AnimatedSection from "../components/animated-section"
import AnimatedCard from "../components/animated-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  const milestones = [
    {
      year: "2023",
      title: "Virtual Museum Launch",
      description: "Introducing the first comprehensive virtual reality museum dedicated to the 45th presidency."
    },
    {
      year: "2024",
      title: "DJT47 Development",
      description: "Expanding our virtual experience with new interactive exhibits and historical archives."
    }
  ]

  const team = [
    {
      role: "Museum Director",
      description: "Leading the curation and development of our virtual exhibits."
    },
    {
      role: "VR Development",
      description: "Creating immersive virtual reality experiences using cutting-edge technology."
    },
    {
      role: "Historical Research",
      description: "Ensuring accuracy and depth in our historical presentations."
    }
  ]

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AnimatedSection className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-6 text-yellow-600 dark:text-yellow-500 font-montserrat"
          >
            About Our Museum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-8 text-gray-700 dark:text-gray-300 font-lora max-w-3xl mx-auto"
          >
            Preserving and presenting history through innovative virtual reality technology
          </motion.p>
        </AnimatedSection>

        {/* Mission Section */}
        <AnimatedSection delay={0.4} className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-yellow-600 dark:text-yellow-500 font-montserrat">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-hind text-lg leading-relaxed">
              To create an immersive and educational virtual reality experience that preserves and presents 
              the legacy of the 45th President of the United States. Through cutting-edge technology and 
              meticulous historical research, we aim to provide an engaging platform for future generations 
              to explore and understand this significant period in American history.
            </p>
          </div>
        </AnimatedSection>

        {/* Milestones Section */}
        <AnimatedSection delay={0.6} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-500 font-montserrat">
            Milestones
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {milestones.map((milestone, index) => (
              <AnimatedCard key={index} delay={0.8 + index * 0.2}>
                <CardHeader>
                  <CardTitle className="text-xl font-montserrat text-gray-800 dark:text-gray-100">
                    {milestone.year} - {milestone.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 font-hind">
                    {milestone.description}
                  </p>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection delay={1.0}>
          <h2 className="text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-500 font-montserrat">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <AnimatedCard key={index} delay={1.2 + index * 0.2}>
                <CardHeader>
                  <CardTitle className="text-xl font-montserrat text-gray-800 dark:text-gray-100">
                    {member.role}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 font-hind">
                    {member.description}
                  </p>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>
      </main>
    </div>
  )
}

