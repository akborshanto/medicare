"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import Cookies from 'js-cookie'

import JWt from "jsonwebtoken";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

type UserProps ={
  user?:{
    name?:string | null | undefined,
    email?:string | null | undefined,
    image?:string | null | undefined
  }
}
export function Navbar({session}:{session:UserProps | null}) {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

const token=Cookies.get("token")
const decode=JWt.decode(token)
console.log(decode)

const handleLogout=()=>{
  console.log("DELETE😀😀😀😀😀😀😀😀")

Cookies.remove('token')

}
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-md"
          : "bg-white/30 backdrop-blur-md"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white/80 backdrop-blur-lg">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="text-2xl font-bold text-teal-600">
                  MediCare
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-lg font-medium hover:text-teal-600 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="text-lg font-medium hover:text-teal-600 transition-colors"
                  >
                    Products
                  </Link>
                  <Link
                    href="/services"
                    className="text-lg font-medium hover:text-teal-600 transition-colors"
                  >
                    Services
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium hover:text-teal-600 transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium hover:text-teal-600 transition-colors"
                  >
                    Contact
                  </Link>
                </nav>
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
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        Sign Up
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden md:block">
            <span className="text-2xl font-bold text-teal-600">MediCare</span>
          </Link>
        </div>
        <Link href="/" className="md:hidden">
          <span className="text-xl font-bold text-teal-600">MediCare</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-teal-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium hover:text-teal-600 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium hover:text-teal-600 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-teal-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-teal-600 transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-700">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-700">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <div className="hidden md:flex gap-2">

{

  session?.user || decode?.user ? 
  
              <Button variant="outline" className=" cursor-pointer" onClick={()=>decode?.user ? handleLogout() : signOut()}>Logout</Button>
            :
            <Link href="/login">
              <Button variant="outline" className=" cursor-pointer"> Sign In</Button>
            </Link>
}


     
          </div>
          <Link href="/account" className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
