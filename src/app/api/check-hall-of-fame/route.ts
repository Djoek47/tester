import { NextRequest, NextResponse } from "next/server"

// Mock database for demonstration purposes
const hallOfFame = new Map<string, Set<string>>(); // payment_intent => Set of names

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const payment_intent = searchParams.get("payment_intent");
  const name = searchParams.get("name");

  if (!payment_intent || !name) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const names = hallOfFame.get(payment_intent) || new Set();
  const exists = names.has(name);

  return NextResponse.json({ exists });
} 