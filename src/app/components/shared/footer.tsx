import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="w-full bg-white/70 backdrop-blur-lg border-t border-gray-200">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-teal-600">MediCare</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Your trusted partner for all healthcare needs. Quality medicines and expert advice for a healthier life.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-teal-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-teal-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-teal-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-teal-600">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-teal-700">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-teal-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-600 hover:text-teal-600">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-teal-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-teal-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-teal-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-teal-700">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                <span className="text-sm text-gray-600">123 Medical Avenue, Healthcare City, 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-600" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-600" />
                <span className="text-sm text-gray-600">support@medicare.com</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-teal-700">Newsletter</h3>
            <p className="text-sm text-gray-600">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Your email" className="bg-white/70 border-gray-200" />
              <Button className="bg-teal-600 hover:bg-teal-700">Subscribe</Button>
            </div>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our{" "}
              <Link href="/privacy" className="text-teal-600 hover:text-teal-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} MediCare. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-xs text-gray-600 hover:text-teal-600">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-xs text-gray-600 hover:text-teal-600">
                Privacy Policy
              </Link>
              <Link href="/shipping" className="text-xs text-gray-600 hover:text-teal-600">
                Shipping Policy
              </Link>
              <Link href="/refund" className="text-xs text-gray-600 hover:text-teal-600">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

