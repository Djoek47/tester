"use client"

import type React from "react"
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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type Donation = {
  name: string
  amount: number
}

const PaymentForm = ({
  clientSecret,
  amount,
  onSuccess,
}: {
  clientSecret: string
  amount: number
  onSuccess: (name: string, amount: number) => void
}) => {
  const [name, setName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

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
      setIsProcessing(false)
    } else {
      onSuccess(name, amount)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <PaymentElement />
      {error && <div className="text-red-600">{error}</div>}
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isProcessing}>
        {isProcessing ? "Processing..." : `Donate CAD $${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}

export default function Donations() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [amount, setAmount] = useState(10)
  const [donations, setDonations] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const createPaymentIntent = useCallback(async (amount: number) => {
    console.log("Creating payment intent with amount:", amount) // Debug log
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          priceId: "price_1QqTzXQxARdI6NgU7GnmPAR3",
        }),
      })
      const data = await response.json()
      console.log("Response from create-payment-intent:", data) // Debug log
      if (data.error) {
        setError(data.error)
      } else {
        setClientSecret(data.clientSecret)
      }
    } catch (err) {
      console.error("Error creating payment intent:", err)
      setError("Failed to initialize payment. Please try again.")
    }
  }, [])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number.parseFloat(e.target.value)
    console.log("Amount changed to:", newAmount) // Debug log
    setAmount(newAmount)
  }

  const handleProceedToPayment = () => {
    createPaymentIntent(amount)
  }

  const fetchDonations = useCallback(async () => {
    try {
      const response = await fetch("https://donationgcloud-831622268277.us-central1.run.app")
      if (!response.ok) {
        throw new Error("Failed to fetch donations")
      }
      const text = await response.text()
      const donationsList = text.split("\n").map((line) => {
        const [name, amountStr] = line.split(": $")
        return { name, amount: Number.parseFloat(amountStr) }
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

  const handleDonationSuccess = async (name: string, amount: number) => {
    console.log("Donation success:", name, amount) // Debug log
    try {
      const response = await fetch("https://donationgcloud-831622268277.us-central1.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, amount }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit donation")
      }

      await fetchDonations()
      alert(`Thank you, ${name}, for your donation of CAD $${amount.toFixed(2)}!`)
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
          <h1 className="text-4xl font-bold mb-4 text-yellow-600 dark:text-yellow-500 font-montserrat">Donations</h1>
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300 font-lora">Support the development of DJT47</p>
          <p className="text-lg mb-6">
            The top donor's name is already immortalized on a grand marble plaque in our current DJT45 virtual museum!
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
              {!clientSecret ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="amount" className="block mb-2">
                      Amount (CAD $)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      min="10"
                      step="0.01"
                      value={amount}
                      onChange={handleAmountChange}
                      required
                    />
                  </div>
                  <Button onClick={handleProceedToPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Proceed to Payment
                  </Button>
                </div>
              ) : (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm clientSecret={clientSecret} amount={amount} onSuccess={handleDonationSuccess} />
                </Elements>
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
                The #1 donor's name is already enshrined on a virtual marble plaque
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
                      <span className="font-bold">CAD ${donation.amount.toFixed(2)}</span>
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

