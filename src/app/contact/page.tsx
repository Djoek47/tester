"use client"

import { motion } from "framer-motion"
import Header from "../components/header"
import AnimatedSection from "../components/animated-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here
  }

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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-8 text-gray-700 dark:text-gray-300 font-lora max-w-3xl mx-auto"
          >
            Have questions about our virtual museum? We&apos;re here to help.
          </motion.p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-yellow-600 dark:text-yellow-500 font-montserrat">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300 font-hind">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="w-full dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300 font-hind">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="w-full dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-gray-700 dark:text-gray-300 font-hind">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    required
                    className="w-full min-h-[150px] dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Information */}
          <AnimatedSection delay={0.6}>
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-yellow-600 dark:text-yellow-500 font-montserrat">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                    <div>
                      <h3 className="font-montserrat text-gray-800 dark:text-gray-100">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-hind">contact@djtmuseum.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                    <div>
                      <h3 className="font-montserrat text-gray-800 dark:text-gray-100">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-hind">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                    <div>
                      <h3 className="font-montserrat text-gray-800 dark:text-gray-100">Location</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-hind">Virtual Reality Space</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-yellow-600 dark:text-yellow-500 font-montserrat">
                  Support Hours
                </h2>
                <div className="space-y-2 font-hind">
                  <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9 AM - 6 PM EST</p>
                  <p className="text-gray-600 dark:text-gray-300">Saturday: 10 AM - 4 PM EST</p>
                  <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  )
}
