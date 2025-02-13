import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, amount, paymentIntentId } = body

  if (!name || !amount || !paymentIntentId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    // Here, make a request to your donation recording service
    const response = await fetch("https://donationgcloud-831622268277.us-central1.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    })

    if (!response.ok) {
      throw new Error("Failed to record donation")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error recording donation:", error)
    return NextResponse.json({ error: "Failed to record donation" }, { status: 500 })
  }
}

