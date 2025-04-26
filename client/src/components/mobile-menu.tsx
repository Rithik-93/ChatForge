import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 focus:outline-none">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white z-50 border-b border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-4">
            <Link to={'/'} className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link to={'/'} className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              Docs
            </Link>
            <Link to={'/'} className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              Use Cases
            </Link>
            <Link to={'/'} className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link to={'/'} className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              Enterprise
            </Link>
            <Link to={'/'} className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              Careers
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
