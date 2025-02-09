"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      <Card className="bg-white dark:bg-gray-800 h-full shadow-lg dark:shadow-gray-900/30 transition-colors duration-200">
        {children}
      </Card>
    </motion.div>
  )
} 