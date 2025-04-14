"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, LogOut } from "lucide-react"
import Cookies from "js-cookie"
import jwt from "jsonwebtoken"
import { signOut } from "next-auth/react"

import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type UserProps = {
  user?: {
    name?: string | null | undefined
    email?: string | null | undefined
    image?: string | null | undefined
  }
}

type DecodedToken = {
  user?: {
    name?: string
    email?: string
    photo?: string
  }
}

export function Navbar({ session }: { session: UserProps | null }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [decodedUser, setDecodedUser] = useState<DecodedToken | null>(null)
  const [cartItemCount, setCartItemCount] = useState(3) // Example count, replace with actual cart logic

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parse JWT token on component mount
  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      try {
        const decoded = jwt.decode(token) as DecodedToken
        setDecodedUser(decoded)
      } catch (error) {
        console.error("Failed to decode token:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove("token")
    setDecodedUser(null)
    window.location.href = "/" // Redirect to home after logout
  }

  const user = session?.user || decodedUser?.user
  const userImage = user?.image || decodedUser?.user?.photo
  const userName = user?.name || decodedUser?.user?.name || "User"

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-white/30 backdrop-blur-md"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white/90 backdrop-blur-lg">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="text-2xl font-bold text-teal-600">
                  MediCare
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="group flex items-center text-lg font-medium transition-colors">
                    <span className="relative">
                      Home
                      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
                    </span>
                  </Link>
                  <Link href="/products" className="group flex items-center text-lg font-medium transition-colors">
                    <span className="relative">
                      Products
                      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
                    </span>
                  </Link>
                  <Link href="/services" className="group flex items-center text-lg font-medium transition-colors">
                    <span className="relative">
                      Services
                      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
                    </span>
                  </Link>
                  <Link href="/about" className="group flex items-center text-lg font-medium transition-colors">
                    <span className="relative">
                      About
                      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
                    </span>
                  </Link>
                  <Link href="/contact" className="group flex items-center text-lg font-medium transition-colors">
                    <span className="relative">
                      Contact
                      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
                    </span>
                  </Link>
                </nav>
                {!user && (
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link href="/login">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/register">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">Sign Up</Button>
                      </Link>
                    </SheetClose>
                  </div>
                )}
                {user && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-2 p-3 rounded-lg bg-gray-50">
                      <Avatar className="h-10 w-10 border-2 border-teal-200">
                        <AvatarImage src={userImage || ""} alt={userName} />
                        <AvatarFallback className="bg-teal-100 text-teal-800">
                          {userName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{userName}</span>
                        <span className="text-sm text-gray-500">{user.email}</span>
                      </div>
                    </div>
                    <SheetClose asChild>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => (decodedUser ? handleLogout() : signOut())}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden md:block">
            <span className="text-2xl font-bold text-teal-600">MediCare</span>
          </Link>
        </div>

        {/* Mobile Logo */}
        <Link href="/" className="md:hidden">
          <span className="text-xl font-bold text-teal-600">MediCare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="group flex items-center text-sm font-medium transition-colors">
            <span className="relative">
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
            </span>
          </Link>
          <Link href="/products" className="group flex items-center text-sm font-medium transition-colors">
            <span className="relative">
              Products
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
            </span>
          </Link>
          <Link href="/services" className="group flex items-center text-sm font-medium transition-colors">
            <span className="relative">
              Services
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
            </span>
          </Link>
          <Link href="/about" className="group flex items-center text-sm font-medium transition-colors">
            <span className="relative">
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
            </span>
          </Link>
          <Link href="/contact" className="group flex items-center text-sm font-medium transition-colors">
            <span className="relative">
              Contact
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-teal-600 transition-transform group-hover:scale-x-100"></span>
            </span>
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-teal-600">
                {cartItemCount}
              </Badge>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            {!user ? (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-teal-200 hover:border-teal-300 hover:bg-teal-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-1 h-auto hover:bg-transparent">
                    <Avatar className="h-8 w-8 border-2 border-teal-200 transition-all hover:border-teal-400">
                      <AvatarImage src={userImage || ""} alt={userName} />
                      <AvatarFallback className="bg-teal-100 text-teal-800">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2 border-b">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userImage || ""} alt={userName} />
                      <AvatarFallback className="bg-teal-100 text-teal-800">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{userName}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/orders">
                    <DropdownMenuItem className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={() => (decodedUser ? handleLogout() : signOut())}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile User Icon */}
          <Link href="/account" className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
