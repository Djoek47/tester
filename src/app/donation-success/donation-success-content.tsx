"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function DonationSuccessContent() {
  const [status, setStatus] = useState("Verifying payment...")
  const [hallOfFameName, setHallOfFameName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get("payment_intent")

  useEffect(() => {
    if (paymentIntentId) {
      verifyPayment(paymentIntentId)
    } else {
      setError("No payment information found. Please contact support.")
    }
  }, [paymentIntentId])

  const verifyPayment = async (paymentIntentId: string) => {
    try {
      const response = await fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
      const data = await response.json()

      if (data.success) {
        setDonationAmount(data.amount / 100) // Convert cents to dollars
        setStatus("Payment verified. Please set your name for the Hall of Fame.")
      } else {
        throw new Error(data.message || "Payment verification failed")
      }
    } catch (err) {
      console.error("Error verifying payment:", err)
      setError("Error verifying payment. Please contact support.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hallOfFameName.trim()) {
      setError("Please enter a name for the Hall of Fame")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/record-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: hallOfFameName,
          amount: donationAmount,
          paymentIntentId: paymentIntentId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("Thank you for your donation!")
        setTimeout(() => {
          window.location.href = "/donations"
        }, 3000)
      } else {
        throw new Error(data.message || "Failed to record donation")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Error recording your donation. Please contact support.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-yellow-600 dark:text-yellow-500 font-montserrat">
            Donation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {donationAmount && (
            <div className="text-center mb-6">
              <p className="text-xl font-bold text-green-600 dark:text-green-500">
                Thank you for your donation of CAD ${donationAmount.toFixed(2)}!
              </p>
            </div>
          )}
          <p className="text-center mb-6 text-gray-700 dark:text-gray-300 font-hind">{status}</p>
          {status.includes("Hall of Fame") && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="hallOfFameName" className="block mb-2">
                  Hall of Fame Name
                </label>
                <Input
                  id="hallOfFameName"
                  type="text"
                  placeholder="Enter your Hall of Fame name"
                  value={hallOfFameName}
                  onChange={(e) => setHallOfFameName(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          )}
          {error && (
            <div className="flex items-center text-red-600 dark:text-red-400 mt-2">
              <AlertCircle className="mr-2 h-4 w-4" />
              <p>{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

