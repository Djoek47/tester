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

