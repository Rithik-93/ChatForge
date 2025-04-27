import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import LogoCube from "@/components/LogoCube"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-mono" >
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to={"/"} className="flex items-center">
                <div className="w-8 h-8 bg-white border border-gray-300 flex items-center justify-center rounded mr-2">
                  <span className="font-bold text-lg">B</span>
                </div>
                <span className="font-medium text-lg">Browserbase</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to={"/"} className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link to={"/"} className="text-gray-600 hover:text-gray-900">
                Docs
              </Link>
              <Link to={"/"} className="text-gray-600 hover:text-gray-900">
                Use Cases
              </Link>
              <Link to={"/"} className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
              <Link to={"/"} className="text-gray-600 hover:text-gray-900">
                Enterprise
              </Link>
              <Link to={"/"} className="text-gray-600 hover:text-gray-900">
                Careers
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to={"/"} className="text-gray-600 hover:text-gray-900">
                Log In
              </Link>
              <Link to={"/"} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Sign Up
              </Link>
              <Link
                to={"/"}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition"
              >
                Get a Demo
              </Link>
            </div>

            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center relative bg-grid-pattern px-4">
        <div className="mb-8">
          <LogoCube h={20} w={20} />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6">A web browser for your AI</h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl text-center mb-10" style={{ fontFamily: 'Neue Montreal, sans-serif' }}>
          Browserbase powers web browsing capabilities for AI agents and applications.
        </p>

        <Link
          to={"/dashboard/bots"}
          className="bg-red-500 text-white px-8 py-4 rounded-md flex items-center text-lg font-medium hover:bg-red-600 transition"
        >
          Run now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <p className="mt-6 text-gray-600">Hit run to launch your headless browser</p>
      </div>
    </main>
  )
}
