"use client"

import { Suspense } from "react"
import DonationSuccessContent from "./donation-success-content"

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonationSuccessContent />
    </Suspense>
  )
}

function DonationSuccessLoading() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500 mb-4">Processing Your Donation</h1>
        <p className="text-gray-700 dark:text-gray-300">Please wait while we confirm your donation...</p>
      </div>
    </div>
  )
}

