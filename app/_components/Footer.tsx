"use client"
import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="Logo" width={30} height={30} />
              <h3 className="text-white font-bold text-xl">AI Trip Planner</h3>
            </div>
            <p className="text-sm mb-4">
              Your intelligent travel companion. Plan perfect trips with AI-powered recommendations and personalized itineraries.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/create-new-trip" className="hover:text-primary transition-colors">
                  Plan a Trip
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/create-new-trip" className="hover:text-primary transition-colors">
                  Paris, France
                </Link>
              </li>
              <li>
                <Link href="/create-new-trip" className="hover:text-primary transition-colors">
                  New York, USA
                </Link>
              </li>
              <li>
                <Link href="/create-new-trip" className="hover:text-primary transition-colors">
                  Tokyo, Japan
                </Link>
              </li>
              <li>
                <Link href="/create-new-trip" className="hover:text-primary transition-colors">
                  Rome, Italy
                </Link>
              </li>
              <li>
                <Link href="/create-new-trip" className="hover:text-primary transition-colors">
                  Dubai, UAE
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>123 Travel Street, Adventure City, AC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:support@aitripplanner.com" className="hover:text-primary transition-colors">
                  support@aitripplanner.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © {currentYear} AI Trip Planner. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
