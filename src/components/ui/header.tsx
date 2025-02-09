"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-xl text-yellow-500 hover:text-yellow-600">
            Trump Museum
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/exhibits" className="text-gray-600 hover:text-yellow-500">
              Exhibits
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-yellow-500">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-yellow-500">
              Contact
            </Link>
            <Link href="/donations" className="text-gray-600 hover:text-yellow-500">
              Donations
            </Link>
          </nav>
          <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="space-y-2">
              <li>
                <Link href="/exhibits" className="block text-gray-600 hover:text-yellow-500">
                  Exhibits
                </Link>
              </li>
              <li>
                <Link href="/about" className="block text-gray-600 hover:text-yellow-500">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block text-gray-600 hover:text-yellow-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/donations" className="block text-gray-600 hover:text-yellow-500">
                  Donations
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

