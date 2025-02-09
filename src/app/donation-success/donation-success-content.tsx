"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function DonationSuccessContent() {
  const [status, setStatus] = useState("Set your name for the Hall of Fame")
  const [hallOfFameName, setHallOfFameName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get("payment_intent")
  const name = searchParams.get("name")
  const amount = searchParams.get("amount")

  useEffect(() => {
    if (paymentIntentId) {
      fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDonationAmount(Number(amount))
            setHallOfFameName(name || "")
          } else {
            throw new Error(data.message || "Payment verification failed")
          }
        })
        .catch((err) => {
          console.error("Error verifying payment:", err)
          setError("Error verifying payment. Please contact support.")
        })
    } else {
      setError("No payment information found. Please contact support.")
    }
  }, [paymentIntentId, amount, name])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hallOfFameName.trim()) {
      setError("Please enter a name for the Hall of Fame")
      return
    }

    setIsSubmitting(true)
    setError(null)
    try {
      const verifyRes = await fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
      const data = await verifyRes.json()

      if (data.success) {
        const response = await fetch("https://us-central1-my-project-test-450122.cloudfunctions.net/donationsHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: hallOfFameName,
            amount: donationAmount,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to record donation")
        }

        setStatus("Thank you for your donation!")
        setTimeout(() => {
          window.location.href = "/donations"
        }, 3000)
      } else {
        throw new Error(data.message || "Payment verification failed")
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
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {donationAmount !== null && (
            <div className="text-center mb-6">
              <p className="text-xl font-bold text-green-600 dark:text-green-500">
                Thank you for your donation of ${donationAmount.toFixed(2)}!
              </p>
            </div>
          )}
          <p className="text-center mb-6 text-gray-700 dark:text-gray-300 font-hind">
            Choose how your name will appear in the Hall of Fame
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your Hall of Fame name"
              value={hallOfFameName}
              onChange={(e) => setHallOfFameName(e.target.value)}
              required
              className="w-full px-4 py-2 text-base"
              aria-label="Hall of Fame name"
            />
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 text-base sm:text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            {error && (
              <div className="flex items-center text-red-600 dark:text-red-400 mt-2">
                <AlertCircle className="mr-2 h-4 w-4" />
                <p>{error}</p>
              </div>
            )}
            {status !== "Set your name for the Hall of Fame" && (
              <p className="text-center mt-4 text-base sm:text-lg text-green-600 dark:text-green-400">{status}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

