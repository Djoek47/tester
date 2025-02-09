import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"
import Link from "next/link"

export default function DonateButton() {
  return (
    <Link href="/donations">
      <Button className="bg-green-600 text-white hover:bg-green-700">
        <DollarSign className="mr-2 h-4 w-4" /> Donate
      </Button>
    </Link>
  )
}

