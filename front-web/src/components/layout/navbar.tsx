import { useState } from 'react'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">EduManage</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-primary">Contact</a>
            <a href="/auth/sign-in" className="bg-primary text-white px-4 py-2 rounded-md">
              Sign In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-primary">Features</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-primary">Pricing</a>
            <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-primary">Contact</a>
            <a href="/login" className="block px-3 py-2 text-primary font-medium">Sign In</a>
          </div>
        </div>
      )}
    </nav>
  )
}
