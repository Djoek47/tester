"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right"

// Define a type for the animation properties
interface AnimationProperties {
  x?: number
  y?: number
}

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
}

// Updated directions with more specific types
const directions: Record<Direction, { initial: AnimationProperties; animate: AnimationProperties }> = {
  up: { initial: { y: 50 }, animate: { y: 0 } },
  down: { initial: { y: -50 }, animate: { y: 0 } },
  left: { initial: { x: -50 }, animate: { x: 0 } },
  right: { initial: { x: 50 }, animate: { x: 0 } },
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, ...directions[direction].initial }}
      animate={{ opacity: 1, ...directions[direction].animate }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
