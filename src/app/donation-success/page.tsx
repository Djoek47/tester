"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Search() {
  const searchParams = useSearchParams()
  return searchParams.get("payment_intent"); // Return the payment intent ID
}

export default function DonationSuccess() {
  const [status, setStatus] = useState("Set your name for the Hall of Fame")
  const [hallOfFameName, setHallOfFameName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number | null>(null)

  // Use the Search component to get paymentIntentId
  const paymentIntentId = (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );

  useEffect(() => {
    // Get donation amount on load
    if (paymentIntentId) {
      fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setDonationAmount(Math.floor(data.amount / 100));
          }
        })
        .catch(err => console.error("Error fetching amount:", err));
    }
  }, [paymentIntentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hallOfFameName.trim()) {
      alert("Please enter a name for the Hall of Fame");
      return;
    }

    setIsSubmitting(true)
    try {
      // First verify the payment with Stripe
      const verifyRes = await fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
      const data = await verifyRes.json()

      if (data.success) {
        // Send donation data with chosen name to server
        const response = await fetch("https://us-central1-my-project-test-450122.cloudfunctions.net/donationsHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: hallOfFameName,
            amount: Math.floor(data.amount / 100)
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to record donation");
        }

        setStatus("Thank you for your donation!");
        setTimeout(() => {
          window.location.href = "/donations";
        }, 3000);
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("Error recording your donation. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-yellow-600 dark:text-yellow-500 font-montserrat">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {donationAmount && (
            <div className="text-center mb-6">
              <p className="text-xl font-bold text-green-600 dark:text-green-500">
                Thank you for your donation of ${donationAmount}!
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
            />
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 text-base sm:text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            {status !== "Set your name for the Hall of Fame" && (
              <p className="text-center mt-4 text-base sm:text-lg">{status}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

