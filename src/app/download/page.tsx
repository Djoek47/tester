import Header from "../components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Monitor, Headset } from "lucide-react"
import Link from "next/link"

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-600">Download Our VR App</h1>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-2">Virtual Donald Trump Museum VR Experience</CardTitle>
              <CardDescription>Immerse yourself in the presidency like never before</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our VR app provides an immersive experience for exploring the Virtual Donald Trump Museum on your PC.
                Step into the Oval Office, walk through significant moments of the Trump presidency, and interact with
                historical artifacts in stunning virtual reality.
              </p>
              <div className="space-y-4">
                <h3 className="font-semibold">System Requirements:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Windows 10 or higher</li>
                  <li>Intel i5-4590 / AMD Ryzen 5 1500X or greater</li>
                  <li>8 GB+ RAM</li>
                  <li>NVIDIA GTX 1060 / AMD Radeon RX 480 or greater</li>
                  <li>VR Headset (Oculus Rift, HTC Vive, or Windows Mixed Reality)</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://storage.googleapis.com/djt45test/Lighting%20RT/T45.7z" passHref>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white text-lg py-4 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 mb-8">
                    <Download className="mr-2 h-5 w-5" /> Download VR App
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Monitor size={16} />
                <span>PC Version</span>
                <Headset size={16} className="ml-4" />
                <span>VR Compatible</span>
              </div>
              <p className="text-sm text-center text-gray-600 mt-4">
                By downloading, you agree to our{" "}
                <Link href="#" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

