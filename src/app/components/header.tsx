"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import DonateButton from "./donate-button"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/exhibits", label: "Exhibits" },
    { href: "/about", label: "About" },
    { href: "/download", label: "Download" },
    { href: "/donations", label: "Donate" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-yellow-600 dark:text-yellow-500 font-montserrat">
            DJT Museum
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors font-montserrat"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <DonateButton />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors px-2 py-1 font-montserrat"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <DonateButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 