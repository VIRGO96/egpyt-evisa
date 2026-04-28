"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-[100]">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              {/* <img
                src="/logo.svg"
                alt="ukevisa.com"
                className="h-10 sm:h-12 min-w-[50px] rounded-sm"
              /> */}
              <span className="text-sm sm:text-base font-medium text-white whitespace-nowrap">
                UKEVISA.COM
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-white/60 font-medium text-sm transition-colors duration-200 flex items-center"
            >
              Home
            </Link>
            <Link
              to="/what-is-eta"
              className="text-white hover:text-white/60 font-medium text-sm transition-colors duration-200 flex items-center"
            >
              What is ETA
            </Link>
            <Link
              to="/eta-guide"
              className="text-white hover:text-white/60 font-medium text-sm transition-colors duration-200 flex items-center"
            >
              ETA Guide
            </Link>
            {/* <Link
              to="/benefits"
              className="text-white hover:text-white/60 font-medium text-sm transition-colors duration-200 flex items-center"
            >
              Benefits
            </Link>
            <Link
              to="/requirements"
              className="text-white hover:text-white/60 font-medium text-sm transition-colors duration-200 flex items-center"
            >
              Requirements
            </Link> */}
            <Link
              to="/about-us"
              className="text-white hover:text-white/60 font-medium text-sm transition-colors duration-200 flex items-center"
            >
              About Us
            </Link>
            {/* <Link
              to="/faqs"
              className="text-white hover:text-white/60 font-medium text-sm transition-colors duration-200 flex items-center"
            >
              FAQs
            </Link> */}
            <Link
              to="/contact-us"
              className="text-white hover:text-white/60 font-medium text-sm transition-colors duration-200 flex items-center"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-blue-600 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col items-center space-y-4 py-4 border-t border-blue-100 animate-fadeIn">
            <Link
              to="/"
              className="block text-center text-white hover:text-white/60 font-medium text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/what-is-eta"
              className="block text-center text-white hover:text-white/60 font-medium text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              What is ETA
            </Link>
            <Link
              to="/eta-guide"
              className="block text-center text-white hover:text-white/60 font-medium text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              ETA Guide
            </Link>
            {/* <Link
              to="/benefits"
              className="block text-center text-white hover:text-white/60 font-medium text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link
              to="/requirements"
              className="block text-center text-white hover:text-white/60 font-medium text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Requirements
            </Link> */}
            <Link
              to="/about-us"
              className="block text-center text-white hover:text-white/60 font-medium text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            {/* <Link
              to="/faqs"
              className="block text-center text-white hover:text-white/60 font-medium text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              FAQs
            </Link> */}
            <Link
              to="/contact-us"
              className="block text-center text-white hover:text-white/60 font-medium text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
