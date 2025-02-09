"use client"

import { useState, useEffect, useCallback } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Header from "../components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Download } from "lucide-react"
import Link from "next/link"
import BitcoinDonateButton from "./bitcoin-donate-button"

// Replace with your Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type Donation = {
  name: string
  amount: number
}

const DonationForm = ({ onSuccess }: { onSuccess: (name: string, amount: string) => void }) => {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (amount) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch(() => setError("Failed to initialize payment. Please try again."))
    }
  }, [amount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return

    setIsProcessing(true)
    setError(null)

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donation-success`,
      },
    })

    if (submitError) {
      setError(submitError.message ?? "An unexpected error occurred")
    } else {
      // Send donation data to server
      try {
        const response = await fetch("https://us-central1-my-project-test-450122.cloudfunctions.net/donationsHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            amount: Number(amount),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to record donation")
        }

        onSuccess(name, amount)
      } catch (err) {
        console.error("Error recording donation:", err)
        setError("Payment successful but failed to record donation. Please contact support.")
      }
    }
    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="amount" className="block mb-2">
          Amount ($)
        </label>
        <Input
          id="amount"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      {clientSecret && <PaymentElement />}
      {error && <div className="text-red-600">{error}</div>}
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        disabled={isProcessing || !clientSecret}
      >
        {isProcessing ? "Processing..." : "Donate"}
      </Button>
    </form>
  )
}

export default function Donations() {
  const [clientSecret, setClientSecret] = useState("")
  const [donations, setDonations] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Failed to initialize payment:", err))
  }, [])

  const fetchDonations = useCallback(async () => {
    try {
      const response = await fetch("https://us-central1-my-project-test-450122.cloudfunctions.net/donationsHandler")
      if (!response.ok) {
        throw new Error("Failed to fetch donations")
      }
      const text = await response.text()
      const donationsList = text.split("\n").map((line) => {
        const [name, amountStr] = line.split(": $")
        return { name, amount: Number.parseInt(amountStr, 10) }
      })
      setDonations(donationsList)
      setError(null)
    } catch (err) {
      setError("Failed to fetch donations. Please try again later.")
      console.error("Error fetching donations:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDonations()
    const intervalId = setInterval(fetchDonations, 5000)
    return () => clearInterval(intervalId)
  }, [fetchDonations])

  const handleDonationSuccess = async (name: string, amount: string) => {
    try {
      // First send POST request to server
      const response = await fetch("https://us-central1-my-project-test-450122.cloudfunctions.net/donationsHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, amount: Number(amount) }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit donation")
      }

      // After successful POST, fetch the updated donations list
      await fetchDonations()

      // Show success message
      alert(`Thank you, ${name}, for your donation of $${amount}!`)
    } catch (err) {
      console.error("Error submitting donation:", err)
      alert("Failed to submit donation. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-yellow-600 dark:text-yellow-500 font-montserrat">
            Donations
          </h1>
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300 font-lora">
            Support the development of DJT47
          </p>
          <p className="text-lg mb-6">
            The top donor&apos;s name is already immortalized on a grand marble plaque in our current DJT45 virtual museum!
          </p>
          <Link href="/download">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-4 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 mb-8">
              <Download className="mr-2 h-5 w-5" /> Download VR App
            </Button>
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-4 text-yellow-600 dark:text-yellow-500 font-montserrat">
                Make a Donation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <DonationForm onSuccess={handleDonationSuccess} />
                </Elements>
              ) : (
                <div className="text-center py-4">Loading payment form...</div>
              )}
              <div className="mt-4">
                <p className="text-center mb-2">Or donate with Bitcoin:</p>
                <BitcoinDonateButton />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-4 text-yellow-600 dark:text-yellow-500 font-montserrat">
                Top Donors - Hall of Fame
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-hind">
                The #1 donor&apos;s name is already enshrined on a virtual marble plaque
              </p>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading donors...</p>
              ) : error ? (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="mr-2" />
                  <p>{error}</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {donations.map((donation, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{donation.name}</span>
                      <span className="font-bold">${donation.amount}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
